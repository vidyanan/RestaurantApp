const { Reservation } = require('../../models/reservation')

module.exports = (req, res) => {
	Reservation.find(req.query).then((reservation) => {
		if (!reservation) {
			res.status(404).send()
		} else {
			res.send(reservation)
		}
	}).catch((error) => {
		res.status(500).send()
	})
}
