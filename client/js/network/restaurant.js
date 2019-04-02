export {
  getRestaurants,
  getRestaurantLocations,
  getRestaurantCuisines,
  getRestaurantCuisinesFeatured,
  getRestaurantBySlug,
  getRestaurantReviewsByRestaurantSlug,
  createRestaurantBooking,
  createRestaurantReview,
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
 * await getRestaurantReviewsByRestaurantSlug(132)
 * [
 *   {
 *     "name": "Alice",
 *     "stars": 5,
 *     "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
 *   }
 * ]
 */
async function getRestaurantReviewsByRestaurantSlug(slug) {
  // GET restaurant reviews from server
  return [
    {
      "name": "Alice",
      "stars": 5,
      "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "createdAt": "2019-03-02T16:00:00.000Z"
    },
    {
      "name": "Bob",
      "stars": 4,
      "comment": "Sed laoreet, justo sit amet imperdiet fermentum, velit enim tristique sapien, at aliquet massa sapien sed dolor.",
      "createdAt": "2019-03-03T01:00:00.000Z"
    },
    {
      "name": "Charlie",
      "stars": 4,
      "comment": "Aliquam nec vehicula diam. Maecenas ac maximus ex, nec aliquet nisi. Nam maximus feugiat euismod.",
      "createdAt": "2019-03-04T05:00:00.000Z"
    },
    {
      "name": "David",
      "stars": 5,
      "comment": "Vestibulum rutrum sed justo sit amet elementum. Quisque porttitor pellentesque justo, sed tempus purus dapibus eget.",
      "createdAt": "2019-03-04T10:00:00.000Z"
    },
    {
      "name": "Evan",
      "stars": 2,
      "comment": "Phasellus nunc lorem, feugiat non sem eget, efficitur condimentum nisl.",
      "createdAt": "2019-03-05T05:00:00.000Z"
    },
    {
      "name": "Frank",
      "stars": 3,
      "comment": "Praesent vel aliquet elit. Donec placerat lectus volutpat, consequat lectus et, pretium libero.",
      "createdAt": "2019-03-05T13:32:42.000Z"
    }
  ];
}

/**
 * Creates a booking at a restaurant by performing a POST request to the server.
 *
 * Returns a promise that resolves to the new booking. Promise will reject if the booking failed to
 * be created for any reason (user or system error).
 *
 * @param {FormData} booking
 * @returns {Promise<Object>}
 */
async function createRestaurantBooking(booking) {
  return null;
}

/**
 * Creates a review at a restaurant by performing a POST request to the server.
 *
 * Returns a promise that resolves to the new review. Promise will reject if the booking failed to
 * be created for any reason (user or system error).
 *
 * @param {FormData} review
 * @returns {Promise<Object>}
 */
async function createRestaurantReview(review) {
  return null;
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
