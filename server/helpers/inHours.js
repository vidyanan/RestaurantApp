/**
 * Returns whether or not a date is in within the operating hours of a restaurant.
 *
 * @param {Array<Array<Number>>>} hours
 * @param {Date} date
 * @returns {Boolean}
 */
module.exports = function inHours(hours, date) {
  const d = date.getDay();
  const h = date.getHours();
  const m = date.getMinutes();
  if (!hours[d]) {
    return false;
  }
  const [ from, to ] = hours[d];
  const x = (h * 60) + m;
  return from === to ||
    (from < to && from < x && x < to) ||
    (from > to && !(to < x && x < from));
}
