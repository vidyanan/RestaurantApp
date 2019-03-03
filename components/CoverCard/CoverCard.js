export class CoverCard extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const template = document.getElementById("CoverCard");
    const fragment = document.importNode(template.content, true);
    shadowRoot.appendChild(fragment);
    const $sr = $(shadowRoot);

    $sr.find(".heading").text(this.getAttribute("heading"));
    $sr.find(".description").text(this.getAttribute("description"));

    const dollars = $sr.find(".dollars");
    const dollarCount = Number(this.getAttribute("dollars")) || 0;
    for (let i = 0; i < dollarCount; i++) {
      dollars.append($('<i class="faß fa-dollar-sign"></i>'));
    }

    const stars = $sr.find(".stars");
    const starCount = Number(this.getAttribute("stars")) || 0;
    for (let i = 0; i < starCount; i++) {
      stars.append($('<i class="fa fa-star"></i>'));
    }
  }
}
