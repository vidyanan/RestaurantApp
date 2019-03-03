export class RestaurantCalendar extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    const template = document.getElementById('RestaurantCalendar')
    const fragment = document.importNode(template.content, true)
    shadowRoot.appendChild(fragment)

    const now = new Date();
    this.year = now.getFullYear();
    this.month = now.getMonth();

    this.$sr = $(shadowRoot);

    this.$sr.find('#month-prev').on('click', this.onMonthPrev.bind(this));
    this.$sr.find('#month-next').on('click', this.onMonthNext.bind(this));
    this.$sr.find('.cells').on('click', this.onCellsClick.bind(this));

    this.renderYearAndMonth();
  }

  renderYearAndMonth() {
    const year = this.year;
    const month = this.month;

    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const offset = first.getDay();
    const count = last.getDate();

    const $cells = this.$sr.find('.cell');

    const monthName = first.toLocaleString('en-us', { month: 'long' });
    this.$sr.find('#year-month')
      .text(`${monthName} ${year}`);

    // Cells before this month
    const lastDayOfLastMonth = new Date(year, month, 0).getDate();
    for (let i = 0; i < offset; i++) {
      $cells.eq(i)
        .text(lastDayOfLastMonth - offset + i + 1)
        .attr('disabled', true)
    }

    // Cells for this month
    for (let i = 0; i < count; i++) {
      $cells.eq(offset + i)
        .text(i + 1)
        .attr('disabled', false)
    }

    // Cells after this month
    for (let i = 0; i < 42 - count - offset; i++) {
      $cells.eq(offset + count + i)
        .text(i + 1)
        .attr('disabled', true)
    }
  }

  onMonthPrev() {
    this.month -= 1;
    if (this.month === -1) {
      this.month = 11;
      this.year -= 1;
    }
    this.renderYearAndMonth();
  }

  onMonthNext() {
    this.month += 1;
    if (this.month === 12) {
      this.month = 0;
      this.year += 1;
    }
    this.renderYearAndMonth();
  }

  onCellsClick(event) {
    const day = Number(event.target.innerText);
    const date = new Date(this.year, this.month, day, 0, 0, 0, 0);
    const newEvent = new CustomEvent('datechange', { detail: date });
    this.dispatchEvent(newEvent);
  }
}
