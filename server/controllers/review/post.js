const { Review } = require('../../models/review')

module.exports = (req, res) => {
	const review = new Review({
		name: req.body.name,
		restaurantId: req.body.restaurantId,
		stars: req.body.stars,
		comment: req.body.comment
	})

	review.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error) // 400 for bad request
	})
}
