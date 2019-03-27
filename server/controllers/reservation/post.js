const { Reservation } = require('../../models/reservation')

module.exports = (req, res) => {
	const reservation = new Reservation({
		name: req.query.name,
		location: req.query.location,
		email: req.query.email,
		host: req.query.host,
		table: req.query.table,
		startTime: Date(req.query.startTime),
		endTime: Date(req.query.endTime)
	})

	reservation.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error) // 400 for bad request
	})
}
