export class RestaurantPreview extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    const template = document.getElementById('RestaurantPreview')
    const fragment = document.importNode(template.content, true)
    shadowRoot.appendChild(fragment)

    $(shadowRoot).find('.heading').text(this.getAttribute('heading'));
    $(shadowRoot).find('.image').attr('src', this.getAttribute('image'));
    $(shadowRoot).find('.url').attr('href', this.getAttribute('url'));
  }
}
