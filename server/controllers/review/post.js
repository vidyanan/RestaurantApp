const { Review } = require('../../models/review')

module.exports = (req, res) => {
	const review = new Review({
		name: req.query.name,
		restaurantName: req.query.restaurantName,
		stars: req.query.stars,
		comment: req.query.comment
	})

	review.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error) // 400 for bad request
	})
}
