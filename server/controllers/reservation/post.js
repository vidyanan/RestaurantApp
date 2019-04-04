const { Reservation } = require('../../models/reservation')

module.exports = (req, res) => {
	const reservation = new Reservation({
		name: req.body.name,
		restaurantId: req.body.restaurantId,
		phonenumber: req.body.phonenumber,
    hostId: req.body.hostId,
		table: req.body.table,
		seats: req.body.seats,
		startTime: new Date(req.body.startTime)
	})

	reservation.save().then((result) => {
		res.json(result).end();
	}, (error) => {
		res.status(400).json(error).end() // 400 for bad request
	})
}
