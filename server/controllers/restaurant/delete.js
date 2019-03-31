const { Restaurant } = require('../../models/restaurant')

module.exports = (req, res) => {
	Restaurant.findOneAndDelete(req.query).then((restaurant) => {
		if (!restaurant) {
			res.status(404).send()
		} else {
			res.status(202).send() //Accepted status
		}
	}).catch((error) => {
		res.status(500).send()
	})
}
