export class Navigation extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById("Navigation");
    const fragment = document.importNode(template.content, true);
    this.appendChild(fragment);
  }
}
