export class RestaurantPreview extends HTMLElement {
  static get observedAttributes() {
    return Object.keys(this.onAttributeChanged);
  }

  static get onAttributeChanged() {
    return {
      heading: RestaurantPreview.prototype.onHeadingAttributeChanged,
      image: RestaurantPreview.prototype.onImageAttributeChanged,
      url: RestaurantPreview.prototype.onUrlAttributeChanged,
    }
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const template = document.getElementById("RestaurantPreview");
    const fragment = document.importNode(template.content, true);
    shadowRoot.appendChild(fragment);

    this.$sr = $(shadowRoot);
    this.$heading = this.$sr.find(".heading");
    this.$image = this.$sr.find(".image");
    this.$url = this.$sr.find(".url");
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    const handler = RestaurantPreview.onAttributeChanged[attrName];
    handler.call(this, oldVal, newVal);
  }

  onHeadingAttributeChanged(oldVal, newVal) {
    this.$heading.text(newVal);
  }

  onImageAttributeChanged(oldVal, newVal) {
    this.$image.attr("src", newVal);
  }

  onUrlAttributeChanged(oldVal, newVal) {
    this.$url.attr("href", newVal);
  }
}
