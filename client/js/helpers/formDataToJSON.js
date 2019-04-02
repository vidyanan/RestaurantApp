export default formDataToJSON;

/**
 * Converts a form data object to a plain object.
 *
 * @param {FormData} formData
 * @returns {Object}
 */
function formDataToJSON(formData) {
  const result = {};
  for (const [ key, value ] of formData.entries()) {
    result[key] = value;
  }
  return result;
}
