import {
  getRestaurants,
  getRestaurantLocations,
  getRestaurantCuisines
} from '/js/network/index.js';

window.addEventListener('CSC309CustomElementsReady', () => {
  $('#location').on('input', () => getRestaurants(getFilters()).then(renderRestaurants));
  $('#cuisine').on('input', () => getRestaurants(getFilters()).then(renderRestaurants));
  $('#datetime').on('input', () => getRestaurants(getFilters()).then(renderRestaurants));

  const query = new URLSearchParams(location.search);

  $('#location').attr('value', query.get('location'));
  $('#cuisine').attr('value', query.get('cuisine'));
  $('#datetime').attr('value', query.get('datetime'));

  getRestaurants(getFilters())
    .then(renderRestaurants);

  getRestaurantLocations()
    .then(renderDatalist($('#locations')));

  getRestaurantCuisines()
    .then(renderDatalist($('#cuisines')));
});

function getFilters() {
  return {
    location: $('#location input').val() || null,
    cuisine: $('#cuisine input').val() || null,
    datetime: $('#datetime input').val() || null,
  };
}

function renderRestaurants(results) {
  return $('#restaurants')
    .empty()
    .append(results.map(renderRestaurantPreview));
}

function renderRestaurantPreview(x) {
  return $('<csc309-restaurant-preview></csc309-restaurant-preview>')
      .attr('heading', x.name)
      .attr('image', x.featuredImage)
      .attr('url', x.url)
}

function renderDatalist($datalist) {
  return items => $datalist.append(items.map(renderOption));
}

function renderOption(item) {
  return $('<option></option>').text(item);
}
