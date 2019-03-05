export {
  getRestaurants,
  getRestaurantLocations,
  getRestaurantCuisines,
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
  const byLocation = location && location.length >= 3;
  const byCuisine = cuisine && cuisine.length >= 3;
  const byHours = datetime;
  const date = new Date(datetime);
  if (byHours && date < new Date()) {
    return [];
  }
  return [{
    name: "Porta Via",
    featuredImage: "/images/restaurants/porta-via.png",
    url: "/restaurant.html?id=porta-via",
    location: "Mississauga",
    cuisine: "Mexican",
    hours: [
      [540, 1320],
      [540, 1320],
      [540, 1320],
      [540, 1320],
      [540, 1320],
      [540, 1440],
      [540, 1440],
    ],
  }, {
    name: "Flava Ceen",
    featuredImage: "/images/restaurants/flava-ceen.jpg",
    url: "/restaurant.html?id=flava-ceen",
    location: "Mississauga",
    cuisine: "Jamaican",
    hours: [
      [540, 60],
      [540, 60],
      [540, 60],
      [540, 60],
      [540, 60],
      [540, 60],
      [540, 60],
    ],
  }, {
    name: "Umami Hakka",
    featuredImage: "/images/restaurants/umami-hakka.jpg",
    url: "/restaurant.html?id=umami-hakka",
    location: "Mississauga",
    cuisine: "Indian",
    hours: [
      null,
      null,
      null,
      null,
      null,
      [1020, 1380],
      [1020, 1380],
    ],
  }, {
    name: "Swiss Chalet",
    featuredImage: "/images/restaurants/swiss-chalet.jpg",
    url: "/restaurant.html?id=swiss-chalet",
    location: "Mississauga",
    cuisine: "Canadian",
    hours: [
      [780, 1320],
      [780, 1320],
      [780, 1320],
      [780, 1320],
      [780, 1320],
      [780, 1320],
      [780, 1320],
    ],
  }, {
    name: "Sail Sushi",
    featuredImage: "/images/restaurants/sail-sushi.jpg",
    url: "/restaurant.html?id=sail-sushi",
    location: "Toronto",
    cuisine: "Japanese",
    hours: [
      [1080, 120],
      [1080, 120],
      [1080, 120],
      [1080, 120],
      [1080, 120],
      [1080, 120],
      [1080, 120],
    ],
  }, {
    name: "Big Bite Burrito",
    featuredImage: "/images/restaurants/big-bite-burrito.jpg",
    url: "/restaurant.html?id=big-bite-burrito",
    location: "Scarborough",
    cuisine: "Mexican",
    hours: [
      [660, 1320],
      [660, 1320],
      [660, 1320],
      [660, 1320],
      [660, 1320],
      [660, 1320],
      [660, 1320],
    ],
  }, {
    name: "Twice As Nice",
    featuredImage: "/images/restaurants/twice-as-nice.jpg",
    url: "/restaurant.html?id=twice-as-nice",
    location: "Toronto",
    cuisine: "Jamaican",
    hours: [
      [540, 1320],
      [540, 1320],
      [540, 1320],
      [540, 1320],
      [540, 1320],
      [540, 1320],
      [540, 1320],
    ],
  }, {
    name: "Sunrise Caribbean",
    featuredImage: "/images/restaurants/sunrise-caribbean.jpg",
    url: "/restaurant.html?id=sunrise-caribbean",
    location: "Toronto",
    cuisine: "Jamaican",
    hours: [
      [660, 1200],
      [660, 1200],
      [660, 1200],
      [660, 1200],
      [660, 1200],
      [660, 1200],
      [660, 1200],
    ],
  }, {
    name: "Kinton Ramen",
    featuredImage: "/images/restaurants/kinton-ramen.jpg",
    url: "/restaurant.html?id=kinton-ramen",
    location: "Scarborough",
    cuisine: "Japanese",
    hours: [
      [540, 1320],
      [540, 1320],
      [540, 1320],
      [540, 1320],
      [540, 1320],
      [540, 1320],
      [540, 1320],
    ],
  }, {
    name: "Little Caesars",
    featuredImage: "/images/restaurants/little-caesars.jpg",
    url: "/restaurant.html?id=little-caesars",
    location: "Scarborough",
    cuisine: "Italian",
    hours: [
      [540, 60],
      [540, 60],
      [540, 60],
      [540, 60],
      [540, 60],
      [660, 180],
      [660, 180],
    ],
  }, {
    name: "La Sani Grill",
    featuredImage: "/images/restaurants/la-sani-grill.jpg",
    url: "/restaurant.html?id=la-sani-grill",
    location: "Scarborough",
    cuisine: "Mediterranean",
    hours: [
      [540, 1320],
      [540, 1320],
      [540, 1320],
      [540, 1320],
      [540, 1320],
      [540, 1320],
      [540, 1320],
    ],
  }].filter((x) => {
    return (
      (!byLocation || fuzzyFilter(location, x.location)) &&
      (!byCuisine || fuzzyFilter(cuisine, x.cuisine)) &&
      (!byHours || inHours(x.hours, date))
    )
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
  return [
    "Mississauga",
    "Scarborough",
    "Toronto",
  ];
}

/**
 * Fetches restaurant cuisines, returns a promise that resolves to an array of cuisines.
 *
 * @returns {Promise<Array<String>>}
 * @example
 * await getRestaurantCuisines()
 * [
 *   "Mississauga",
 * ]
 */
async function getRestaurantCuisines() {
  return [
    "Canadian",
    "Indian",
    "Italian",
    "Jamaican",
    "Japanese",
    "Mediterranean",
    "Mexican",
  ];
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

function inHours(hours, date) {
  const d = date.getDay();
  const h = date.getHours();
  const m = date.getMinutes();
  if (!hours[d]) {
    return false;
  }
  const [ from, to ] = hours[d];
  const x = (h * 60) + m;
  return from === to ||
    (from < to && from < x && x < to) ||
    (from > to && !(to < x && x < from));
}
