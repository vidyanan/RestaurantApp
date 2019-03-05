export {
  getRestaurantBySlug,
  getRestaurantReviewsByRestaurantSlug,
  createRestaurantBooking,
  createRestaurantReview,
};

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
  // GET restaurant from server
  return {
    "id": 132,
    "name": "Porta Via",
    "slug": "porta-via",
    "cuisine": "Mexican",
    "dollars": 2,
    "stars": 4
  };
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
