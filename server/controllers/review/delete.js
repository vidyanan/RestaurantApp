const { Review } = require('../../models/review')

module.exports = (req, res) => {
	const n = req.query.name

	Review.findOneAndUpdate({name : n}, {$set: req.query},  {new: true}).then((review) => {
		if (!review) {
			res.status(404).send()
		} else {
			res.send(review)
		}
	}).catch((error) => {
		res.status(500).send()
	})
}
