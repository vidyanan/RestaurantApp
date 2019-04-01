const { Reservation } = require('../../models/reservation')

module.exports = (req, res) => {
	const reservation = new Reservation({
		name: req.query.name,
		location: req.query.location,
		phonenumber: req.query.phonenumber,
		host: req.query.host,
		table: req.query.table,
		seats: req.query.seats,
		startTime: Date(req.query.startTime)
	})

	reservation.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error) // 400 for bad request
	})
}
