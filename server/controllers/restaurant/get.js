const _ = require('lodash');
const { Restaurant } = require('../../models/restaurant')
const like = require('../../helpers/like');
const inHours = require('../../helpers/inHours');

module.exports = async (req, res) => {
  try {
    const {
      location,
      cuisine,
      datetime,
    } = req.query;

    const byLocation = Boolean(location && location.length >= 3);
    const byCuisine = Boolean(cuisine && cuisine.length >= 3);
    const byHours = Boolean(datetime);
    const date = new Date(datetime);

    const conditions = _.omitBy({
      location: byLocation ? like(location) : undefined,
      cuisine: byCuisine ? like(cuisine) : undefined,
    }, _.isUndefined);
    const restaurants = (await Restaurant.find(conditions))
      .filter(x => !byHours || inHours(x.hours, date))

    res.json(restaurants).end();
	} catch (err) {
    console.error(err);
		res.status(500).end();
	}
}
