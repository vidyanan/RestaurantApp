const { Restaurant } = require('../../models/restaurant')

module.exports = (req, res) => {
	Restaurant.find({}).then((restaurant) => {
		if (!restaurant) {
			res.status(404).send()
		} else {
			let hours = new Set()
			for (let i = 0; i < restaurant.length; i++){
					hours.add(restaurant[i].hours);
			}
			res.send(Array.from(hours))
		}
	}).catch((error) => {
		res.status(500).send()
	})
}
