const { Reservation } = require('../../models/reservation')

module.exports = (req, res) => {
	const n = req.query.name
	const l = req.query.location
	const e = req.query.email

	Reservation.findOneAndUpdate({name : n, location: l, email: e}, {$set: req.query},  {new: true}).then((reservation) => {
		if (!reservation) {
			res.status(404).send()
		} else {
			res.send(reservation)
		}
	}).catch((error) => {
		res.status(500).send()
	})
}
