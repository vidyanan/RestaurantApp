export class Input extends HTMLElement {
  constructor() {
    super()
    const template = document.getElementById('Input')
    const fragment = document.importNode(template.content, true)
    this.appendChild(fragment)

    const $sr = $(this);

    const $label = $sr.find('label');
    if (this.getAttribute('label')) {
      $label.text(this.getAttribute('label'));
    } else {
      $label.addClass('sr-only');
    }
    $label.text(this.getAttribute('label') || this.getAttribute('placeholder'));
    $label.attr('for', this.getAttribute('input-id'));

    const $input = $sr.find('.form-control');
    $input.attr('id', this.getAttribute('input-id'));
    $input.attr('name', this.getAttribute('name'));
    $input.attr('type', this.getAttribute('type'));
    $input.attr('placeholder', this.getAttribute('placeholder'));
    if (this.getAttribute('required')) {
      $input.attr('required', true);
    }

    const $help = $sr.find('.form-text');
    if (this.getAttribute('help')) {
      $help.text(this.getAttribute('help'));
    } else {
      $help.remove();
    }

    const $iconContainer = $sr.find('.input-group-prepend');
    if (this.getAttribute('icon-class')) {
      const $icon = $iconContainer.find('i');
      $icon.addClass(this.getAttribute('icon-class'));
    } else {
      $iconContainer.remove();
    }
  }
}
