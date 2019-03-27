const { Restaurant } = require('../../models/restaurant')

module.exports = (req, res) => {
	Restaurant.find({}).then((restaurant) => {
		if (!restaurant) {
			res.status(404).send()
		} else {
			let cuisine = new Set()
			for (let i = 0; i < restaurant.length; i++){
					cuisine.add(restaurant[i].cuisine);
			}
			res.send(Array.from(cuisine))
		}
	}).catch((error) => {
		res.status(500).send()
	})
}
