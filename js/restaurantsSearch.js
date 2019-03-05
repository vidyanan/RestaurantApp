// Hardcoded data that should be in the database
const restaurantData = [{
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
}];
const locationData = Array.from(new Set(restaurantData.map(x => x.location)));
const cuisineData = Array.from(new Set(restaurantData.map(x => x.cuisine)));

window.addEventListener('CSC309CustomElementsReady', () => {
  $('#location').on('input', () => getRestaurants(getFilters()).then(renderRestaurants))
  $('#cuisine').on('input', () => getRestaurants(getFilters()).then(renderRestaurants))
  $('#datetime').on('input', () => getRestaurants(getFilters()).then(renderRestaurants))
  populateDatalist($('#locations'), locationData);
  populateDatalist($('#cuisines'), cuisineData);
  setFilters(new URLSearchParams(location.search))
  getRestaurants(getFilters()).then(renderRestaurants)
});

function setFilters(query) {
  $('#location').attr('value', query.get('location'));
  $('#cuisine').attr('value', query.get('cuisine'));
  $('#datetime').attr('value', query.get('datetime'));
}

function getFilters() {
  return {
    location: $('#location input').val() || null,
    cuisine: $('#cuisine input').val() || null,
    datetime: $('#datetime input').val() || null,
  };
}

function renderRestaurants(results) {
  const $restaurants = $('#restaurants');
  $restaurants.empty();
  $restaurants.append(results.map(renderRestaurantPreview));
}

function renderRestaurantPreview(x) {
  return $('<csc309-restaurant-preview></csc309-restaurant-preview>')
      .attr('heading', x.name)
      .attr('image', x.featuredImage)
      .attr('url', x.url)
}

  // GET data from server
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
  return restaurantData.filter((x) => {
    return (
      (!byLocation || fuzzyFilter(location, x.location)) &&
      (!byCuisine || fuzzyFilter(cuisine, x.cuisine)) &&
      (!byHours || inHours(x.hours, date))
    )
  });
}

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

function populateDatalist($el, items) {
  $el.append(items.map(item => $('<option></option>').text(item)));
}
