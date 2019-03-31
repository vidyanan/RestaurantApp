const { Review } = require('../../models/review')

module.exports = (req, res) => {
	Review.findOneAndDelete(req.query).then((review) => {
		if (!review) {
			res.status(404).send()
		} else {
			res.status(202).send() //Accepted status
		}
	}).catch((error) => {
		res.status(500).send()
	})
}
