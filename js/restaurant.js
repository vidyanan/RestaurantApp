$(document).ready(function() {
  $('#calendar').on('datechange', onDateChange)
  $('#review').on('submit', onReviewSubmit);

  function onDateChange(event) {
    const value = event.detail;

    const leftZeroPad = (n) => n >= 10 ? String(n) : `0${n}`;

    const year = value.getFullYear();
    const month = leftZeroPad(value.getMonth() + 1);
    const day = leftZeroPad(value.getDate());
    const hour = leftZeroPad(value.getHours());
    const minute = leftZeroPad(value.getMinutes());

    const datetimeLocal = `${year}-${month}-${day}T${hour}:${minute}`

    $('#datetime').val(datetimeLocal);
  }

  function onReviewSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    $('#reviews').append(
      $('<div class="review"></div>')
        .append($('<div class="d-flex justify-content-between"></div>')
          .append($(`<csc309-stars count="${data.get('stars')}"></csc309-stars>`))
          .append($('<span class="text-muted"></span>').text(new Date().toLocaleString()))
        )
        .append($('<h4></h4>').text(data.get('name')))
        .append($('<p class="lead"></p>').text(data.get('comment')))
    )
  }
});
