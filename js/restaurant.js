// Hardcoded data that should be in the database
const reviewData = [
  {
    name: "Alice",
    stars: 5,
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    name: "Bob",
    stars: 4,
    comment: "Sed laoreet, justo sit amet imperdiet fermentum, velit enim tristique sapien, at aliquet massa sapien sed dolor."
  },
  {
    name: "Charlie",
    stars: 4,
    comment: "Aliquam nec vehicula diam. Maecenas ac maximus ex, nec aliquet nisi. Nam maximus feugiat euismod.",
  },
  {
    name: "David",
    stars: 5,
    comment: "Vestibulum rutrum sed justo sit amet elementum. Quisque porttitor pellentesque justo, sed tempus purus dapibus eget."
  },
  {
    name: "Evan",
    stars: 2,
    comment: "Phasellus nunc lorem, feugiat non sem eget, efficitur condimentum nisl."
  },
  {
    name: "Frank",
    stars: 3,
    comment: "Praesent vel aliquet elit. Donec placerat lectus volutpat, consequat lectus et, pretium libero."
  },
];
const restaurantData = {
  name: 'Porta Via',
  cuisine: 'Mexican',
  dollars: 2,
  stars: Math.round(reviewData.reduce((r, x) => r + x.stars, 0) / reviewData.length)
};

$(document).ready(function() {
  $("#calendar").on("datechange", onDateChange);
  $("#review").on("submit", onReviewSubmit);
  $("#booking").on('submit', onBookingSubmit);

  const query = new URLSearchParams(location.search);
  const id = query.get('id');

  getRestaurant(id).then(renderRestaurant)
  getRestaurantReviews(id).then((reviews) => $("#reviews").append(reviews.map(renderReview)));

  function renderRestaurant(restaurant) {
    $('#restaurant-card').attr('heading', restaurant.name);
    $('#restaurant-card').attr('description', restaurant.cuisine);
    $('#restaurant-dollars').attr('count', restaurant.dollars);
    $('#restaurant-stars').attr('count', restaurant.stars);
  }

  function renderReview(review) {
    return $('<div class="review"></div>')
      .append(
        $('<div class="d-flex justify-content-between"></div>')
          .append($(`<csc309-stars count="${review.stars}"></csc309-stars>`))
          .append(
            $('<span class="text-muted"></span>').text(
              new Date().toLocaleString()
            )
          )
      )
      .append($("<h4></h4>").text(review.name))
      .append($('<p class="lead"></p>').text(review.comment));
  }

  /**
   * Sets the date when a day in the calendar is clicked.
   *
   * @param {CustomEvent} event
   */
  function onDateChange(event) {
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
  function onBookingSubmit(event) {
    event.preventDefault();
    $('#booking .text-danger').text('')
    const data = new FormData(event.target);
    if (!data.get('name')) {
      $('#booking .text-danger').text('Name is required')
      return;
    }
    if (!data.get('phone')) {
      $('#booking .text-danger').text('Phone is required')
      return;
    }
    if (!data.get('datetime')) {
      $('#booking .text-danger').text('Date & Time is required')
      return;
    }
    if (!data.get('seats')) {
      $('#booking .text-danger').text('Seats is required')
      return;
    }
    $('#booking .text-success').text(`${data.get('name')}, we have received your booking.`)
  }

  // POST review to server
  function onReviewSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    $("#reviews").append(
      renderReview({
        name: data.get("name"),
        stars: data.get("stars"),
        comment: data.get("comment"),
      })
    );
  }

  // GET restaurant from server
  async function getRestaurant(id) {
    return restaurantData;
  }

  // GET restaurant reviews from server
  async function getRestaurantReviews(id) {
    return reviewData;
  }
});
