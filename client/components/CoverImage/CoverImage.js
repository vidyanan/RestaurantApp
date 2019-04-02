export class CoverImage extends HTMLElement {
  static get observedAttributes() {
    return Object.keys(this.onAttributeChanged);
  }

  static get onAttributeChanged() {
    return {
      src: CoverImage.prototype.onSrcAttributeChanged,
      alt: CoverImage.prototype.onAltAttributeChanged,
    }
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const template = document.getElementById("CoverImage");
    const fragment = document.importNode(template.content, true);
    shadowRoot.appendChild(fragment);
    this.$sr = $(shadowRoot);

    this.$img = this.$sr.find("img");
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    const handler = CoverImage.onAttributeChanged[attrName];
    if (handler) {
      handler.call(this, oldVal, newVal);
    }
  }

  onSrcAttributeChanged(oldVal, newVal) {
    this.$img.attr("src", newVal);
  }

  onAltAttributeChanged(oldVal, newVal) {
    this.$img.attr("alt", newVal);
  }
}
