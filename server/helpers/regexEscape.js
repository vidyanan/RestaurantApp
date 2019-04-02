/**
 * Escapes a string for use in a regular expression.
 *
 * @param {string} string
 * @returns {string}
 * @see https://stackoverflow.com/a/6969486/5153138
 */
module.exports = function regexEscape(string) {
  if (!string || typeof string !== 'string') {
    throw new Error(`regexEscape: Expected truthy string but got ${string}`);
  }
  // $& means the whole matched string
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
