const { Restaurant } = require('../../models/restaurant')
const { ObjectID } = require('mongodb')

module.exports = (req, res) => {
	const id = req.params.id
	if (!ObjectID.isValid(id)) {
		res.status(404).send()
	}

	Restaurant.findById(id).then((restaurant) => {
		if (!restaurant) {
			res.status(404).send()
		} else {
			res.send(restaurant)
		}
	}).catch((error) => {
		res.status(500).send()
	})
}
