/**
 * Module contains thingies animation scene
 * @module components/thingiesScreen
 * @author Igor Ivanov
 */
import { DropShadowFilter } from '@pixi/filter-drop-shadow';
import { Container, Point } from 'pixi.js';

import { RESIZE, MOUSE_MOVE } from '../../constants';
import App from '../../core/index';
import ErrorMessage from '../errorMessage';

import Thingie from './elements/thingie';
import { isNear } from './utils';

/**
 * Animation scene class, contains Thingies logic.
 * @class Thingies
 * @param {Object} props
 *      scene properties
 * @constructor
 */
const Thingies = function Thingies(props) {
  App.apply(this, [props]);
  this.props = props;
  this.state = this.props.store.getState();
  this.viewportHeight = this.app.screen.height;
  this.viewportWidth = this.app.screen.width;
  this.mousepos = new Point(500, 500);
  this.props.store.subscribe(() => {
    this.state = this.props.store.getState();
  });
};

Thingies.prototype = Object.create(App.prototype);

Thingies.prototype.setBackground = function setBackground() {
  this.cleanRenderer();

  const background = this.createSpite(this.app.loader.resources.thingiesBackground.texture);

  background.position.x = -((background.width - this.viewportWidth) / 2);
  background.position.y = -(background.height - this.viewportHeight);

  this.addChildren([background]);
};

Thingies.prototype.addThingies = function addThingies() {
  const thingies = [];
  const images = [];
  const container = new Container();
  this.addChild(container);

  for (let index = 1; index <= 17; index++) {
    images.push(`thingiesItem${index}`);
  }

  for (let index = 0; index < 100; index++) {
    // prettier-ignore
    const texture = this.textureFrom(
      images[Math.floor(Math.random() * images.length)]
    );
    const t = new Thingie(texture);

    // prettier-ignore
    t.setInitialPoint(
      this.viewportWidth * Math.random(),
      (this.viewportHeight + 300) * Math.random() - 300
    );

    const near = thingies.some((t2) => isNear(t.position, t2.position));

    if (!near) {
      thingies.push(t);
      container.addChild(t);
    }
  }

  this.startAnimating();

  this.props.store.subscribe(() => {
    thingies.forEach((t) => t.update(this.mousepos));
  });

  container.filters = [
    new DropShadowFilter({
      blur: 3,
      quality: 5,
      alpha: 0.6,
      color: 0x000000,
      distance: 20,
      rotation: 0
    })
  ];
};

/**
 * Loads textures starts playing scene.
 */
Thingies.prototype.init = function init() {
  this.cleanView();
  this.appendView();
  this.preload({
    assets: this.props.assets,
    error: () => {
      ErrorMessage.displayError(this.props.parentNode);
    },
    callback: () => {
      this.setBackground();
      this.addThingies();
    }
  });

  window.addEventListener(RESIZE, () => {
    this.resizeHandler();
  });

  window.addEventListener(MOUSE_MOVE, (e) => {
    const { x, y } = e;
    if (this.mousepos.x !== x && this.mousepos.y !== y) {
      this.mousepos.set(x, y);
    }
  });
};

export default Thingies;
