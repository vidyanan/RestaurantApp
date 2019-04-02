export class RestaurantReview extends HTMLElement {
  static get observedAttributes() {
    return Object.keys(this.onAttributeChanged);
  }

  static get onAttributeChanged() {
    return {
      heading: RestaurantReview.prototype.onHeadingAttributeChanged,
      date: RestaurantReview.prototype.onDateAttributeChanged,
      comment: RestaurantReview.prototype.onCommentAttributeChanged,
      stars: RestaurantReview.prototype.onStarsAttributeChanged,
    }
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const template = document.getElementById("RestaurantReview");
    const fragment = document.importNode(template.content, true);
    shadowRoot.appendChild(fragment);

    this.$sr = $(shadowRoot);
    this.$heading = this.$sr.find("#heading");
    this.$date = this.$sr.find("#date");
    this.$comment = this.$sr.find("#comment");
    this.$stars = this.$sr.find("#stars");
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    const handler = RestaurantReview.onAttributeChanged[attrName];
    if (handler) {
      handler.call(this, oldVal, newVal);
    }
  }

  onHeadingAttributeChanged(oldVal, newVal) {
    this.$heading.text(newVal);
  }

  onDateAttributeChanged(oldVal, newVal) {
    this.$date.text(newVal);
  }

  onCommentAttributeChanged(oldVal, newVal) {
    this.$comment.text(newVal);
  }

  onStarsAttributeChanged(oldVal, newVal) {
    this.$stars.attr("count", newVal);
  }
}
