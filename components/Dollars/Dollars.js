export class Dollars extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    const template = document.getElementById('Dollars')
    const fragment = document.importNode(template.content, true)
    shadowRoot.appendChild(fragment)
    const $sr = $(shadowRoot);

    const dollars = $sr.find('.dollars');
    const dollarCount = Number(this.getAttribute('count')) || 0;
    for (let i = 0; i < dollarCount; i++) {
      dollars.append($('<i class="fa fa-dollar-sign"></i>'));
    }
  }
}
