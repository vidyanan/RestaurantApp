import formDataToJSON from '/js/helpers/formDataToJSON.js';
export {
  getRestaurants,
  getRestaurantLocations,
  getRestaurantCuisines,
  getRestaurantCuisinesFeatured,
  getRestaurantBySlug,
  getRestaurantReviewsByRestaurantId,
  createRestaurantBooking,
  createRestaurantReview,
  deleteServerReservation,
  getRestaurantReservationsByRestaurantIdAndDate
};

/**
 * Fetches restaurants that match the filters, returns a promise that resolves to an array of
 * restaurants.
 *
 * @param {Object} filter
 * @param {String} filter.location
 * @param {String} filter.cuisine
 * @param {Date|String|Number} filter.datetime
 * @returns {Promise<Array<Object>>}
 * @example
 * await getRestaurants()
 * [
 *   {
 *     name: "Porta Via",
 *     featuredImage: "/images/restaurants/porta-via.png",
 *     url: "/restaurant.html?id=porta-via",
 *     location: "Mississauga",
 *     cuisine: "Mexican",
 *     hours: [
 *       [540, 1320],
 *       [540, 1320],
 *       [540, 1320],
 *       [540, 1320],
 *       [540, 1320],
 *       [540, 1440],
 *       [540, 1440],
 *     ],
 *   }
 * ]
 */
async function getRestaurants({
  location = null,
  cuisine = null,
  datetime = null,
}={}) {
  return new Promise((resolve, reject) => {
    const q = {
      location: location ? encodeURIComponent(location) : '',
      cuisine: cuisine ? encodeURIComponent(cuisine) : '',
      datetime: datetime ? encodeURIComponent(datetime.toISOString()) : '',
    };
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": `/restaurant?location=${q.location}&cuisine=${q.cuisine}&datetime=${q.datetime}`,
      "method": "GET",
      "headers": {
        "cache-control": "no-cache",
      }
    })
      .done(resolve)
      .fail(reject);
  });
}

/**
 * Fetches restaurant locations, returns a promise that resolves to an array of locations.
 *
 * @returns {Promise<Array<String>>}
 * @example
 * await getRestaurantLocations()
 * [
 *   "Mississauga",
 * ]
 */
async function getRestaurantLocations() {
  return new Promise((resolve, reject) => {
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "/location",
      "method": "GET",
      "headers": {
        "cache-control": "no-cache",
      }
    })
      .done(resolve)
      .fail(reject);
  })
}

/**
 * Fetches restaurant cuisines, returns a promise that resolves to an array of cuisines.
 *
 * @returns {Promise<Array<String>>}
 * @example
 * await getRestaurantCuisines()
 * [
 *   "Canadian",
 * ]
 */
async function getRestaurantCuisines() {
  return new Promise((resolve, reject) => {
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "/cuisine",
      "method": "GET",
      "headers": {
        "cache-control": "no-cache",
      }
    })
      .done(resolve)
      .fail(reject);
  });
}

/**
 * Fetches featured restaurant cuisines, returns a promise that resolves to an array of cuisines.
 *
 * @returns {Promise<Array<Object>>}
 * @example
 * await getRestaurantCuisines()
 * [
 *   {
 *     "name": "Italian",
 *     "featuredImage": "/images/restaurants/little-caesars.jpg"
 *   }
 * ]
 */
async function getRestaurantCuisinesFeatured() {
  return new Promise((resolve, reject) => {
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "/cuisine/featured",
      "method": "GET",
      "headers": {
        "cache-control": "no-cache",
      }
    })
      .done(resolve)
      .fail(reject);
  })
}

/**
 * Fetches a restaurant by its id, returns a promise that resolves to a restaurant.
 *
 * @param {String|Number} slug restaurant slug
 * @returns {Promise<Object>}
 * @example
 * await getRestaurantBySlug(132)
 * {
 *  "id": 132,
 *  "name": "Porta Via",
 *  "slug": "porta-via",
 *  "cuisine": "Mexican",
 *  "dollars": 2,
 *  "stars": 4
 * }
 */
async function getRestaurantBySlug(slug) {
  return new Promise((resolve, reject) => {
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": `/restaurant/slug/${encodeURIComponent(slug)}`,
      "method": "GET",
      "headers": {
        "cache-control": "no-cache",
      }
    })
      .done(resolve)
      .fail(reject);
  })
}

/**
 * Fetches a restaurant's reviews by its slug, returns a promise that resolves to an array of
 * restaurant reviews.
 *
 * @param {String|Number} slug restaurant slug
 * @returns {Promise<Array<Object>>}
 * @example
 * await getRestaurantReviewsByRestaurantId("5ca29311dff32fa1e3ebb43d")
 * [
 *   {
 *     "name": "Alice",
 *     "stars": 5,
 *     "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
 *   }
 * ]
 */
async function getRestaurantReviewsByRestaurantId(id) {
  return new Promise((resolve, reject) => {
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": `/review?restaurantId=${id}`,
      "method": "GET",
      "headers": {
        "cache-control": "no-cache",
        "Postman-Token": "57369746-f3ec-455a-9f65-dad638b6e52f"
      }
    })
      .done(resolve)
      .fail(reject);
  })
}

/**
 * Creates a booking at a restaurant by performing a POST request to the server.
 *
 * Returns a promise that resolves to the new booking. Promise will reject if the booking failed to
 * be created for any reason (user or system error).
 *
 * @param {Object|FormData} booking
 * @returns {Promise<Object>}
 * @example
 * await createRestaurantBooking({
 *   "name": "Omar Chehab",
 *   "restaurantId": "5ca294015a7683a1fae31e57",
 *   "phonenumber": "+12893423432",
 *   "table": "53",
 *   "seats": 6,
 *   "startTime": "2019-04-02T03:46:26.376Z"
 * })
 * // Alternatively, in a form submit event handler
 * (event) => createRestaurantBooking(new FormData(event.target))
 */
async function createRestaurantBooking(booking) {
  return new Promise((resolve, reject) => {
    if (booking instanceof FormData) {
      booking = formDataToJSON(booking);
    }
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "/reservation",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
      },
      "processData": false,
      "data": JSON.stringify(booking),
    })
      .done(resolve)
      .fail(reject);
  })
}

/**
 * Creates a review at a restaurant by performing a POST request to the server.
 *
 * Returns a promise that resolves to the new review. Promise will reject if the booking failed to
 * be created for any reason (user or system error).
 *
 * @param {Object|FormData} review
 * @returns {Promise<Object>}
 * @example
 * await createRestaurantReview({
 *   "name": "Alice Doe",
 *   "restaurantId": "5ca294ba5a7683a1fae31e59",
 *   "stars": 4,
 *   "comment": "Lorem ipsum dolor set amit lorem ipsum"
 * })
 * // Alternatively, in a form submit event handler
 * (event) => createRestaurantReview(new FormData(event.target))
 */
async function createRestaurantReview(review) {
  return new Promise((resolve, reject) => {
    if (review instanceof FormData) {
      review = formDataToJSON(review);
      console.log(review);
    }
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "/review",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
      },
      "processData": false,
      "data": JSON.stringify(review)
    })
      .done(resolve)
      .fail(reject);
  })
}

async function getRestaurantReservationsByRestaurantIdAndDate(id, startDate, endDate) {
  return new Promise((resolve, reject) => {
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": `/reservation/${id}/${startDate}/${endDate}"`,
      "method": "GET",
      "headers": {
        "cache-control": "no-cache",
        "Postman-Token": "57369746-f3ec-455a-9f65-dad638b6e52f"
      }
    })
      .done(resolve)
      .fail(reject);
  })
}

async function deleteServerReservation(id) {
  return new Promise((resolve, reject) => {
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "/reservation?_id=" + id,
      "method": "DELETE",
      "headers": {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
      },
      "processData": false,
    })
      .done(resolve)
      .fail(reject);
  })
}


// Helper functions that should be on the server
function fuzzyFilter(searchText, key) {
  if (!searchText || !key) {
    return;
  }
  const compareString = key.toLowerCase();
  searchText = searchText.toLowerCase();

  let searchTextIndex = 0;
  for (let index = 0; index < key.length; index++) {
    if (compareString[index] === searchText[searchTextIndex]) {
      searchTextIndex += 1;
    }
  }

  return searchTextIndex === searchText.length;
}
