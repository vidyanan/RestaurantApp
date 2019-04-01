import {
  getRestaurantCuisinesFeatured,
} from '/js/network/index.js';

$(document).ready(() => {
  getRestaurantCuisinesFeatured().then(renderFeaturedCuisines)
});

function renderFeaturedCuisines(cuisines) {
  return $('#cuisines')
    .empty()
    .append(cuisines.map(renderCuisinePreview));
}

function renderCuisinePreview(cuisine) {
  return $('<csc309-restaurant-preview></csc309-restaurant-preview>')
    .attr('heading', cuisine.name)
    .attr('image', cuisine.featuredImage)
    .attr('url', `/restaurantsSearch.html?cuisine=${encodeURIComponent(cuisine.name)}`)
}
