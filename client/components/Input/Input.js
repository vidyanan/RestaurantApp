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
      size: Input.prototype.onSizeAttributeChanged,
    }
  }

  constructor() {
    super();
    const template = document.getElementById("Input");
    const fragment = document.importNode(template.content, true);
    this.appendChild(fragment);

    this.$this = $(this);
    this.$inputContainer = this.$this.find(".input-container");
    this.$label = this.$this.find("label");
    this.$input = this.$this.find(".form-control");
    this.$formTextParent = this.$this.find(".form-text").parent();
    this.$formText = this.$this.find(".form-text").remove();
    this.$inputGroup = this.$this.find(".input-group");
    this.$iconGroupPrependParent = this.$this.find(".input-group-prepend").parent();
    this.$iconGroupPrepend = this.$this.find(".input-group-prepend").remove();
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    const handler = Input.onAttributeChanged[attrName];
    if (handler) {
      handler.call(this, oldVal, newVal);
    }
  }

  onHelpAttributeChanged(oldVal, newVal) {
    this.$formText.remove();
    if (newVal) {
      this.$formTextParent.prepend(this.$formText);
      this.$formText.text(newVal);
    }
  }

  onIconClassAttributeChanged(oldVal, newVal) {
    this.$iconGroupPrepend.remove();
    if (newVal) {
      this.$iconGroupPrependParent.prepend(this.$iconGroupPrepend);
      const $icon = this.$iconGroupPrepend.find("i");
      $icon.addClass(newVal);
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
    if (newVal !== null) {
      this.$input.attr("required", true);
    } else {
      this.$input.removeAttr("required");
    }
  }

  onSizeAttributeChanged(oldVal, newVal) {
    this.$inputContainer.removeClass(`input-${oldVal}`);
    this.$inputContainer.addClass(`input-${newVal}`);
  }
}
