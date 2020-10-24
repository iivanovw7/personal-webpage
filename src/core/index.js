/**
 * Main animation core APP class
 * @module core/index
 * @author Igor Ivanov
 */
import { AnimatedSprite, Application, Sprite, TilingSprite, Graphics, TextStyle, Text, utils, Texture } from 'pixi.js';

import { getViewportSize } from '../utils';

import { resize, tick } from './actions';

// Skips hello message
utils.skipHello();

/**
 * Returns application core class constructor.
 * Used to operate with pixi.js methods to make changes in scene canvas.
 * @param {Object} props
 *      object contains scene properties.
 * @constructor
 */
const App = function App(props) {
  this.props = props;
  const { core } = this.props.store.getState();
  const { width, height } = core.sceneSize;

  this.app = new Application({
    ...this.props.sceneParams,
    width,
    height
  });

  this.app.renderer.plugins.interaction.cursorStyles.default = this.props.customCursor;
};

App.prototype = {
  /**
   * Removes content of parent node in props.
   * @return {void}
   *      if parentNode exists changes its content to an empty string;
   */
  cleanView: function cleanView() {
    const { parentNode } = this.props;
    if (parentNode && typeof parentNode === 'object') {
      parentNode.innerHTML = '';
    }
  },

  appendView: function appendView() {
    const { parentNode, store } = this.props;
    const { core } = store.getState();
    const { adaptiveSize, customClass } = core;

    if (customClass) {
      parentNode.classList.add(customClass);
    }

    parentNode.classList.add(adaptiveSize ? 'responsive' : 'static');
    parentNode.appendChild(this.app.view);
  },

  /**
   * Handles rerender at window resize event,
   * re-centers canvas, or changes canvas properties in case adaptive property is set to true;
   * @return {void}
   *      returns renderer.resize method with current window size
   */
  resizeHandler: function resizeHandler() {
    const { store } = this.props;
    const { core } = store.getState();
    const { adaptiveSize } = core;

    store.dispatch(resize(adaptiveSize));

    if (adaptiveSize) {
      const { width, height } = getViewportSize();

      this.app.renderer.resize(width, height);
    }
  },

  /**
   * Iterates over all children of current stage removes them until nothing is left
   * @return {void}
   */
  cleanRenderer: function cleanRenderer() {
    while (this.app.stage.children[0]) {
      this.app.stage.removeChild(this.app.stage.children[0]);
    }
  },

  removeChild: function removeChild(child) {
    this.app.stage.removeChild(child);
  },

  removeChildren: function removeChildren(children) {
    let index = children.length;
    // eslint-disable-next-line no-plusplus
    while (index--) {
      this.app.stage.removeChild(children[index]);
    }
  },

  destroy: function destroy() {
    this.app.stage.destroy(this.props.sceneParams);
    this.app.ticker.destroy();
    this.app.renderer.destroy(true);
  },

  render: function render() {
    this.app.renderer.render(this.app.stage);
  },

  tickerAdd: function tickerAdd(fn) {
    this.app.ticker.add(fn);
  },

  tickerRemove: function tickerRemove(fn) {
    this.app.ticker.remove(fn);
  },

  load: function load(scene) {
    this.app.loader.load(scene);
  },

  textureFrom: function textureFrom(asset) {
    return Texture.from(asset);
  },

  createSpite: function createSpite(resource) {
    return new Sprite(resource);
  },

  /**
   * Accepts animation resource in params and adds it to a current stage.
   * @param {PIXI.DisplayObject} resource
   *      animation resource.
   * @return {*}
   *      adds passed resource to a stage
   */
  addChild: function addChild(resource) {
    return this.app.stage.addChild(resource);
  },

  /**
   * Start the animation loop
   */
  startAnimating() {
    this.app.animating = true;
    window.requestAnimationFrame(this.animate.bind(this));
  },

  /**
   * Stops animation loop
   */
  stopAnimating() {
    this.app.animating = false;
  },

  /**
   * Main animation loop, updates animation store
   */
  animate() {
    const { store } = this.props;

    if (this.app.animating) {
      window.requestAnimationFrame(this.animate.bind(this));
      store.dispatch(tick());
    }
  },

  /**
   * Adds resources to the stage.
   * @param {Array<PIXI.DisplayObject>} resources
   *      array of resources to be add
   * @return {void}
   *      iterates over resources and calls addChild().
   */
  addChildren: function addChildren(resources = []) {
    let res = resources.length;
    // eslint-disable-next-line no-plusplus
    while (res--) {
      this.app.stage.addChild(resources[res]);
    }
  },

  createTilingSprite: function createTilingSprite(resource, width, height) {
    return new TilingSprite(resource, width, height);
  },

  createAnimatedSprite: function createAnimatedSprite(resources = {}) {
    const frames = Object.keys(resources).map((k) => resources[k]);
    return new AnimatedSprite(frames);
  },

  /**
   * Used for destructuring resource list passed in params and loading assets.
   * Displays progress loader while loading assets, at the end returns passed callback.
   * Accepts: error handler and callback function (called if resources were loaded successfully).
   * @param {Object} params
   *      preload parameters set
   * @return {void}
   *      returns callback action
   */
  preload: function preload(params) {
    const { store, messages } = this.props;
    const { core } = store.getState();
    const { width, height } = core.sceneSize;
    const { loader } = this.app;
    let progressBarStep = 10;
    let ease = 0;

    // Setup loader title text style
    const loaderTitleStyle = new TextStyle({
      fontSize: 12,
      fill: '#eeeeee'
    });
    // Setup loader title text and progress bar
    const loaderTitle = new Text(messages.loaderTitle, loaderTitleStyle);
    const loaderPath = new Graphics().beginFill(0x646464).drawRect(0, -2.5, width / 3, 5);
    const progressBar = new Graphics().beginFill(0xff0000).drawRect(0, -2.5, width / 3, 5);

    loaderPath.x = width / 3;
    loaderPath.y = height / 2;
    loaderTitle.x = width / 2 - loaderTitle.width / 2;
    loaderTitle.y = height / 2 - loaderTitle.height / 2 - 20;

    // Draw loader progress bar path and title
    this.addChild(loaderPath);
    this.addChild(loaderTitle);

    // Create complete list of assets to be loaded
    const assets = Object.values(params.assets.Assets).map((e) => {
      e.url = params.assets.BaseDir + e.url;
      return e;
    });

    progressBarStep = 100 / (assets.length + 1);
    progressBar.x = width / 3;
    progressBar.y = height / 2;
    progressBar.scale.x = 0;

    // Draw loader progress bar path
    this.addChild(progressBar);

    // Starts loading assets
    loader.add(assets).load();

    // Animate progress bar
    loader.onProgress.add(() => {
      ease += progressBarStep * 0.01;
      progressBar.scale.x = ease;
    });

    // Actions if all resources have been loaded
    loader.onComplete.add(() => params.callback(assets));

    // In case of error
    loader.onError.add(() => params.error());
  }
};

export default App;
