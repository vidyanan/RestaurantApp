const { Reservation } = require('../../models/reservation')
const { ObjectID } = require('mongodb')

module.exports = (req, res) => {
	const id = req.params.id
  const start = req.params.start
  const end = req.params.end
	if (!ObjectID.isValid(id)) {
		res.status(404).send()
	}

	Reservation.find({restaurantId: {$eq: id}, startTime: {$gte: start, $lt: end}}).then((reservation) => {
		if (!reservation) {
			res.status(404).send()
		} else {
			res.send(reservation)
		}
	}).catch((error) => {
		res.status(500).send()
	})
}
