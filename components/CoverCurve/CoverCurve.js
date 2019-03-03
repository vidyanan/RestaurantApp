export class CoverCurve extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const template = document.getElementById("CoverCurve");
    const fragment = document.importNode(template.content, true);
    shadowRoot.appendChild(fragment);
  }
}
