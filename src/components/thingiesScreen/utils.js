import { deviceMap } from '../../constants';
import { getDeviceType } from '../../utils';

/**
 * Detects if current device type is `Desktop`.
 * @return {boolean} Returns `true` if device type is `Desktop` and `false` otherwise.
 */
export const isDesktop = () => getDeviceType(window.innerWidth) === deviceMap.desktop;

/**
 * Detects if two thingies are cole to each other by coordinates.
 * @param {Object.<number>} p1 - point #1 coordinates.
 * @param {Object.<number>} p2 - point #2 coordinates.
 * @return {boolean}
 *    Returns `true` if two points are close to each other and `false` otherwise.
 */
export const isNear = (p1, p2) => {
  const a = p1.x - p2.x;
  const b = p1.y - p2.y;
  const c = Math.sqrt(a * a + b * b);
  return c < 100;
};

/**
 * Returns cursor position.
 * @param {event} eventData - event data object.
 * @return {{x: number, y: number}|{x: *, y: *}}
 *  position coordinates.
 */
export function getPosition(eventData) {
  if (isDesktop()) {
    return { x: eventData.x, y: eventData.y };
  } else {
    const { clientX, clientY } = eventData.touches[0];

    return { x: clientX, y: clientY };
  }
}
