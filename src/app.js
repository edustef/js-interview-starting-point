const MAX_RESULTS = 3;

/**
 * @typedef {Object} Position
 * @property {number} x
 * @property {number} y
 */

/**
 * @param {Position[]} shops
 * @param {Position} position
 * @returns {Position[]}
 */
export function getNearestShops(shops, position) {
  return shops.toSorted(byDistance(position)).slice(0, MAX_RESULTS);
}

/**
 * @param {Position} position
 * @returns {(a: Position, b: Position) => number}
 */
function byDistance(position) {
  return (a, b) => squaredDistance(position, a) - squaredDistance(position, b);
}

/**
 * @param {Position} a
 * @param {Position} b
 * @returns {number}
 */
function squaredDistance(a, b) {
  return (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
}
