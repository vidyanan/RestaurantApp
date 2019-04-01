const { Restaurant } = require('../../models/restaurant')

module.exports = (req, res) => {
	const restaurant = new Restaurant({
		name: req.body.name,
		restaurantOwner: req.query.restaurantOwner,
		featuredImage: req.body.featuredImage,
		slug: req.body.slug,
		location: req.body.location,
		cuisine: req.body.cuisine,
		hours: req.body.hours
	})

	restaurant.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error)
	})
}
