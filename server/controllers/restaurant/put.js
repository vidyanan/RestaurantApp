const { Restaurant } = require('../../models/restaurant')

module.exports = (req, res) => {
	const n = req.query.name
	const l = req.query.location

	Restaurant.findOneAndUpdate({name : n, location: l}, {$set: req.query},  {new: true}).then((restaurant) => {
		if (!restaurant) {
			res.status(404).send()
		} else {
			res.send(restaurant)
		}
	}).catch((error) => {
		res.status(500).send()
	})
}
