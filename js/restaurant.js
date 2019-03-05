import {
  getRestaurantBySlug,
  getRestaurantReviewsByRestaurantSlug,
  createRestaurantBooking,
  createRestaurantReview,
} from '/js/network/index.js';

window.addEventListener('CSC309CustomElementsReady', () => {
  $("#booking").on('submit', onCreateBookingSubmit);
  $("#review").on("submit", onCreateReviewSubmit);
  $("#calendar").on("datechange", onCalendarDateChange);

  const query = new URLSearchParams(location.search);
  const slug = query.get('slug');
  $(".restaurant-slug").val(slug)

  // GET restaurant from server and render it
  getRestaurantBySlug(slug)
    .then(renderRestaurant)

  // GET restaurant reviews from server and render them
  getRestaurantReviewsByRestaurantSlug(slug)
    .then((reviews) => $("#reviews").append(reviews.map(renderReview)));
});

function renderRestaurant(restaurant) {
  $('#restaurant-card')
    .attr('heading', restaurant.name)
    .attr('description', restaurant.cuisine);

  $('#restaurant-dollars')
    .attr('count', restaurant.dollars);

  $('#restaurant-stars')
    .attr('count', restaurant.stars);
}

function renderReview(review) {
  return $('<csc309-restaurant-review></csc309-restaurant-review')
    .attr('heading', review.name)
    .attr('comment', review.comment)
    .attr('stars', review.stars)
    .attr('date', new Date(review.createdAt).toLocaleDateString())
}

/**
 * Sets the date when a day in the calendar is clicked.
 *
 * @param {CustomEvent} event
 */
function onCalendarDateChange(event) {
  const value = event.detail;

  const leftZeroPad = n => (n >= 10 ? String(n) : `0${n}`);

  const year = value.getFullYear();
  const month = leftZeroPad(value.getMonth() + 1);
  const day = leftZeroPad(value.getDate());
  const hour = leftZeroPad(value.getHours());
  const minute = leftZeroPad(value.getMinutes());

  const datetimeLocal = `${year}-${month}-${day}T${hour}:${minute}`;

  $("#datetime").val(datetimeLocal);
}

// POST booking to server
async function onCreateBookingSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  await createRestaurantBooking(data);
  alert(`${data.get('name')}, we have received your booking!`)
  event.target.reset();
}

// POST review to server
async function onCreateReviewSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  await createRestaurantReview(data);
  $("#reviews").append(
    renderReview({
      name: data.get("name"),
      stars: data.get("stars"),
      comment: data.get("comment"),
    })
  );
  event.target.reset();
}
