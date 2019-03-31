const { Reservation } = require('../../models/reservation')

module.exports = (req, res) => {
	Reservation.findOneAndDelete(req.query).then((reservation) => {
		if (!reservation) {
			res.status(404).send()
		} else {
			res.status(202).send() //Accepted status
		}
	}).catch((error) => {
		res.status(500).send()
	})
}
