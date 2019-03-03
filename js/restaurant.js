$(document).ready(function() {
  $('#calendar').on('datechange', onDateChange)

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
});
