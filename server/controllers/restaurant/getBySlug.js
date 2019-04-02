const { Restaurant } = require("../../models/restaurant");

module.exports = async (req, res) => {
  try {
    const { slug } = req.params;

    const restaurant = await Restaurant.findOne({ slug });

    if (!restaurant) {
      res.status(404).end();
    } else {
      const restaurantObj = restaurant.toObject();
      restaurantObj.stars = 2;
      restaurantObj.dollars = 4;

      res.json(restaurantObj).end();
    }
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
