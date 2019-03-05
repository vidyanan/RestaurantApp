export class Stars extends HTMLElement {
  static get observedAttributes() {
    return Object.keys(this.onAttributeChanged);
  }

  static get onAttributeChanged() {
    return {
      count: Stars.prototype.onCountAttributeChanged,
    }
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const template = document.getElementById("Stars");
    const fragment = document.importNode(template.content, true);
    shadowRoot.appendChild(fragment);

    this.$sr = $(shadowRoot);
    this.$stars = this.$sr.find(".stars");
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    const handler = Stars.onAttributeChanged[attrName];
    handler.call(this, oldVal, newVal);
  }

  onCountAttributeChanged(oldVal, newVal) {
    const count = Number(newVal) || 0;
    for (let i = 0; i < count; i++) {
      this.$stars.append($('<i class="fa fa-star"></i>'));
    }
  }
}
