const { Restaurant } = require('../../models/restaurant')

module.exports = (req, res) => {
	const restaurant = new Restaurant({
		name: req.query.name,
		restaurantOwner: req.query.restaurantOwner,
		featuredImage: req.query.featuredImage,
		url: req.query.url,
		location: req.query.location,
		cuisine: req.query.cuisine,
    cuisineImage: req.query.cuisineImage,
		hours: req.query.hours
	})

	restaurant.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error)
	})
}
