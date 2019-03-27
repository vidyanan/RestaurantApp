const { Reservation } = require('../../models/reservation')
const { ObjectID } = require('mongodb')

module.exports = (req, res) => {
	const id = req.params.id
	if (!ObjectID.isValid(id)) {
		res.status(404).send()
	}

	Reservation.findById(id).then((reservation) => {
		if (!reservation) {
			res.status(404).send()
		} else {
			res.send(reservation)
		}
	}).catch((error) => {
		res.status(500).send()
	})
}
