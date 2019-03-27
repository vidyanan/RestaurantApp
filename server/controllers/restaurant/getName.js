const { Restaurant } = require('../../models/restaurant')

module.exports = (req, res) => {
	Restaurant.find({}).then((restaurant) => {
		if (!restaurant) {
			res.status(404).send()
		} else {
			let name = new Set()
			for (let i = 0; i < restaurant.length; i++){
					name.add(restaurant[i].name);
			}
			res.send(Array.from(name))
      	res.status(200).send()
		}
	}).catch((error) => {
		res.status(500).send()
	})
}
