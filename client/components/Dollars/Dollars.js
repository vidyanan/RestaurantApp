export class Dollars extends HTMLElement {
  static get observedAttributes() {
    return Object.keys(this.onAttributeChanged);
  }

  static get onAttributeChanged() {
    return {
      count: Dollars.prototype.onCountAttributeChanged,
    }
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const template = document.getElementById("Dollars");
    const fragment = document.importNode(template.content, true);
    shadowRoot.appendChild(fragment);

    this.$sr = $(shadowRoot);
    this.$dollars = this.$sr.find(".dollars");
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    const handler = Dollars.onAttributeChanged[attrName];
    handler.call(this, oldVal, newVal);
  }

  onCountAttributeChanged(oldVal, newVal) {
    const count = Number(newVal) || 0;
    for (let i = 0; i < count; i++) {
      this.$dollars.append($('<i class="fa fa-dollar-sign"></i>'));
    }
  }
}
