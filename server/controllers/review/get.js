const { Review } = require('../../models/review')

module.exports = (req, res) => {
  Review.find(req.query).then((review) => {
		if (!review) {
			res.status(404).send()
		} else {
			res.send(review)
		}
	}).catch((error) => {
		res.status(500).send()
	})
}
