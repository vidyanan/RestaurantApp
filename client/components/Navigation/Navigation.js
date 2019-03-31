export class Navigation extends HTMLElement {
  static get observedAttributes() {
    return Object.keys(this.onAttributeChanged);
  }

  static get onAttributeChanged() {
    return {
      loggedin: Navigation.prototype.onLoggedinAttributeChanged,
    }
  }

  constructor() {
    super();
    const template = document.getElementById("Navigation");
    const fragment = document.importNode(template.content, true);
    this.appendChild(fragment);

    this.$loggedout = $('.navigation-loggedout');
    this.$loggedin = $('.navigation-loggedin');
    this.$loggedin.css('display', 'none');
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    const handler = Navigation.onAttributeChanged[attrName];
    handler.call(this, oldVal, newVal);
  }

  onLoggedinAttributeChanged(oldVal, newVal) {
    if (newVal !== null) {
      this.$loggedout.css('display', 'none');
      this.$loggedin.css('display', '');
    } else {
      this.$loggedout.css('display', '');
      this.$loggedin.css('display', 'none');
    }
  }
}
