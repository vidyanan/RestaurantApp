export class CoverCard extends HTMLElement {
  static get observedAttributes() {
    return Object.keys(this.onAttributeChanged);
  }

  static get onAttributeChanged() {
    return {
      heading: CoverCard.prototype.onHeadingAttributeChanged,
      description: CoverCard.prototype.onDescriptionAttributeChanged,
    }
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const template = document.getElementById("CoverCard");
    const fragment = document.importNode(template.content, true);
    shadowRoot.appendChild(fragment);
    this.$sr = $(shadowRoot);

    this.$heading = this.$sr.find(".heading")
    this.$description = this.$sr.find(".description")
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    const handler = CoverCard.onAttributeChanged[attrName];
    handler.call(this, oldVal, newVal);
  }

  onHeadingAttributeChanged(oldVal, newVal) {
    this.$heading.text(newVal);
  }

  onDescriptionAttributeChanged(oldVal, newVal) {
    this.$description.text(newVal);
  }
}
