const { Restaurant } = require('../../models/restaurant')

module.exports = (req, res) => {
	Restaurant.find(req.query).then((restaurant) => {
		if (!restaurant) {
			res.status(404).send()
		} else {
			res.send(restaurant)
		}
	}).catch((error) => {
		res.status(500).send()
	})
}
