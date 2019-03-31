const { Review } = require('../../models/review')
const { ObjectID } = require('mongodb')

module.exports = (req, res) => {
	const id = req.params.id
	if (!ObjectID.isValid(id)) {
		res.status(404).send()
	}

	Review.findById(id).then((review) => {
		if (!review) {
			res.status(404).send()
		} else {
			res.send(review)
		}
	}).catch((error) => {
		res.status(500).send()
	})
}
