const { Restaurant } = require('../../../models/restaurant')

module.exports = (req, res) => {
  Restaurant.find({}).then((restaurant) => {
    if (!restaurant) {
      res.status(404).end()
    } else {
      const featuredCuisines = Object.values(restaurant.reduce((result, restaurant) => {
        const object = result[restaurant.cuisine] || {
          count: 0,
          name: restaurant.cuisine,
          featuredImage: restaurant.featuredImage,
        };
        object.count++;
        result[restaurant.cuisine] = object;
        return result;
      }, {}))
        .sort((cuisineA, cuisineB) => cuisineB.count - cuisineA.count)
        .slice(0, 3)
        .map(cuisine => ({
          name: cuisine.name,
          featuredImage: cuisine.featuredImage,
        }));
      res.json(featuredCuisines);
    }
  }).catch((error) => {
    res.status(500).end()
  })
}
