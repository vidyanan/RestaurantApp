export class ContainerCurve extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    const template = document.getElementById('ContainerCurve')
    const fragment = document.importNode(template.content, true)
    shadowRoot.appendChild(fragment)
  }
}
