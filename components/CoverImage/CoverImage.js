export class CoverImage extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    const template = document.getElementById('CoverImage')
    const fragment = document.importNode(template.content, true)
    shadowRoot.appendChild(fragment)
    const img = shadowRoot.querySelector('img');
    img.setAttribute('src', this.getAttribute('src'));
    img.setAttribute('alt', this.getAttribute('alt'));
  }
}
