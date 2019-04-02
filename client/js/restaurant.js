import {
  getRestaurantBySlug,
  getRestaurantReviewsByRestaurantId,
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
    .then((restaurant) => {
      renderRestaurant(restaurant)

      $(".restaurant-id").val(restaurant._id)

      // GET restaurant reviews from server and render them
      getRestaurantReviewsByRestaurantId(restaurant._id)
        .then(renderReviews);
    })
    .catch(handleRestaurantError)
});

function renderRestaurant(restaurant) {
  $('#restaurant-featuredimage')
    .attr('src', restaurant.featuredImage);

  $('#restaurant-dollars')
    .attr('count', restaurant.dollars);

  $('#restaurant-stars')
    .attr('count', restaurant.stars);

  return $('#restaurant-card')
    .attr('heading', restaurant.name)
    .attr('description', restaurant.cuisine);
}

function handleRestaurantError(err) {
  const status = err.status || 500;
  switch (status) {
    case 404:
      return renderPageError('Restaurant does not exist!');

    default:
      return renderPageError('Internal error, something went wrong with our servers, please contact us!');
  }
}

function renderPageError(text) {
  return $('#page')
    .empty()
    .addClass('container')
    .append($('<h1 class="h3 mt-5"></h1>').text(text));
}

function renderReviews(reviews) {
  return $("#reviews")
    .append(reviews.map(renderReview))
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
  try {
    $('#booking .text-danger').text('');
    event.preventDefault();
    const data = new FormData(event.target);
    await createRestaurantBooking(data);
    alert(`${data.get('name')}, we have received your booking!`)
    event.target.reset();
  } catch (err) {
    console.error(err);
    $('#booking .text-danger').text(
      err.responseJSON
      ? err.responseJSON.message || err.responseJSON.errmsg
      : 'Internal error, please try again'
    );
  }
}

// POST review to server
async function onCreateReviewSubmit(event) {
  try {
    $('#review .text-danger').text('');
    event.preventDefault();
    const data = new FormData(event.target);
    await createRestaurantReview(data);
    $("#reviews").append(
      renderReview({
        name: data.get("name"),
        stars: data.get("stars"),
        comment: data.get("comment"),
        createdAt: new Date(),
      })
    );
    event.target.reset();
  } catch (err) {
    console.error(err);
    $('#review .text-danger').text(
      err.responseJSON
      ? err.responseJSON.message || err.responseJSON.errmsg
      : 'Internal error, please try again'
    );
  }
}
