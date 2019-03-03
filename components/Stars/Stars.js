export class Stars extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const template = document.getElementById("Stars");
    const fragment = document.importNode(template.content, true);
    shadowRoot.appendChild(fragment);
    const $sr = $(shadowRoot);

    const stars = $sr.find(".stars");
    const starCount = Number(this.getAttribute("count")) || 0;
    for (let i = 0; i < starCount; i++) {
      stars.append($('<i class="fa fa-star"></i>'));
    }
  }
}
