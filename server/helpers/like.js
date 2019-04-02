const regexEscape = require('./regexEscape');

/**
 * Returns a regular expression that matches if `str` is in the string.
 *
 * @param {string} str
 * @returns {RegExp}
 */
module.exports = function like(str) {
  return new RegExp(`^[\\w\\W]*${regexEscape(str)}[\\w\\W]*$`, 'i')
};
