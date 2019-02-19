import * as components from '/components/loader.js'

$(document).ready(function() {
  if (
    'registerElement' in document
    && 'import' in document.createElement('link')
    && 'content' in document.createElement('template')
  ) {
    registerComponents(components).then(onComponentsReady)
  } else {
    window.addEventListener('WebComponentsReady', () => registerComponents(components).then(onComponentsReady))
  }

  /**
   * Registers each web component exported by the component loader.
   *
   * @param {Module} components
   * @returns {Promise}
   */
  function registerComponents(components) {
    const prefix = 'csc309';
    const kebabCase = x => x.replace(/([A-Z])/g, '-$1').toLowerCase();
    return Promise.all(Object.entries(components)
      .map(([componentName, Component]) => new Promise((resolve) => {
        $.get(`/components/${componentName}/${componentName}.html`, (templateHTML) => {
          document.head.insertAdjacentHTML('beforeend', templateHTML);
          customElements.define(`${prefix}${kebabCase(componentName)}`, Component)
          resolve()
        })
      })))
  }

  /**
   * Fired when web components have been defined.
   */
  function onComponentsReady() {
    document.getElementById('loading').remove();
  }
})
