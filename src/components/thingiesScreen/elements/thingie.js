/**
 * Module contains thingie
 * @module components/thingiesScreen/elements/Thingie
 */
import { Point, Sprite } from 'pixi.js';

/**
 * Element class, contains Thingie.
 * @class Thingie
 * @param {Object} props
 *      scene properties
 * @constructor
 */
export default class Thingie extends Sprite {
  constructor(texture) {
    super(texture);

    this.offset = new Point(0, 0);
    this.targetOffset = new Point(0, 0);
    this.originPosition = new Point(0, 0);
    this.alpha = 0.9;
  }

  /**
   * Sets initial element position
   * @param {number} x - position set
   * @param {number} y - position set
   */
  setInitialPoint(x, y) {
    this.position.set(x, y);
    this.originPosition.set(x, y);
  }

  /**
   * Handles mouse position update
   * @param {Object} mousepos
   *  mose position coordinates
   */
  update(mousepos) {
    const { x, y } = mousepos;
    const x1 = this.originPosition.x;
    const y1 = this.originPosition.y;
    const xDist = x1 - x;
    const yDist = y1 - y;
    const dist = Math.sqrt(xDist * xDist + yDist * yDist);
    if (dist < 200) {
      const angle = Math.atan2(yDist, xDist);
      const xaDist = Math.cos(angle) * dist;
      const yaDist = Math.sin(angle) * dist;
      this.targetOffset.set(xaDist, yaDist);
    } else {
      this.targetOffset.set(0, 0);
    }
    this.offset.x += (this.targetOffset.x - this.offset.x) * 0.01;
    this.offset.y += (this.targetOffset.y - this.offset.y) * 0.01;

    // prettier-ignore
    this.position.set(
      this.originPosition.x + this.offset.x,
      this.originPosition.y + this.offset.y
    );
  }
}
