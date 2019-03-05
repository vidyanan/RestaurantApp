export class Input extends HTMLElement {
  static get observedAttributes() {
    return Object.keys(this.onAttributeChanged);
  }

  static get onAttributeChanged() {
    return {
      help: Input.prototype.onHelpAttributeChanged,
      'icon-class': Input.prototype.onIconClassAttributeChanged,
      'input-id': Input.prototype.onInputIdAttributeChanged,
      label: Input.prototype.onLabelAttributeChanged,
      list: Input.prototype.onListAttributeChanged,
      max: Input.prototype.onMaxAttributeChanged,
      min: Input.prototype.onMinAttributeChanged,
      name: Input.prototype.onNameAttributeChanged,
      placeholder: Input.prototype.onPlaceholderAttributeChanged,
      type: Input.prototype.onTypeAttributeChanged,
      required: Input.prototype.onRequiredAttributeChanged,
      value: Input.prototype.onValueAttributeChanged,
    }
  }

  constructor() {
    super();
    const template = document.getElementById("Input");
    const fragment = document.importNode(template.content, true);
    this.appendChild(fragment);

    this.$this = $(this);
    this.$label = this.$this.find("label");
    this.$input = this.$this.find(".form-control");
    this.$help = this.$this.find(".form-text");
    this.$iconContainer = this.$this.find(".input-group-prepend");
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    const handler = Input.onAttributeChanged[attrName];
    handler.call(this, oldVal, newVal);
  }

  onHelpAttributeChanged(oldVal, newVal) {
    if (newVal) {
      this.$help.text(newVal);
      // TODO: If this.$help was removed then re-add it.
    } else {
      this.$help.remove();
    }
  }

  onIconClassAttributeChanged(oldVal, newVal) {
    if (newVal) {
      const $icon = this.$iconContainer.find("i");
      $icon.addClass(newVal);
      // TODO: if this.$iconContainer was removed then re-add it.
    } else {
      this.$iconContainer.remove();
    }
  }

  onInputIdAttributeChanged(oldVal, newVal) {
    this.$input.attr("id", newVal);
    this.$label.attr("for", newVal);
  }

  onLabelAttributeChanged(oldVal, newVal) {
    if (newVal) {
      this.$label.text(newVal);
      this.$label.removeClass("sr-only");
    } else {
      this.$label.text('');
      this.$label.addClass("sr-only");
    }
  }

  onListAttributeChanged(oldVal, newVal) {
    this.$input.attr("list", newVal);
  }

  onMaxAttributeChanged(oldVal, newVal) {
    this.$input.attr("max", newVal);
  }

  onMinAttributeChanged(oldVal, newVal) {
    this.$input.attr("min", newVal);
  }

  onNameAttributeChanged(oldVal, newVal) {
    this.$input.attr("name", newVal);
  }

  onPlaceholderAttributeChanged(oldVal, newVal) {
    this.$input.attr("placeholder", newVal);
  }

  onTypeAttributeChanged(oldVal, newVal) {
    this.$input.attr("type", newVal);
  }

  onValueAttributeChanged(oldVal, newVal) {
    this.$input.attr("value", newVal);
  }

  onRequiredAttributeChanged(oldVal, newVal) {
    if (newVal) {
      this.$input.attr("required", true);
    } else {
      this.$input.removeAttr("required");
    }
  }
}
