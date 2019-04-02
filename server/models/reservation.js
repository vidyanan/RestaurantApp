const mongoose = require('mongoose')

const Reservation = mongoose.model('Reservation', {
	name: {
		type: String,
		required: true,
	},
	restaurantId: {
		type: String,
		required: true,
	},
	phonenumber: {
		type: Number,
		required: false
	},
	table: {
		type: Number,
		required: false
	},
	seats: {
		type: Number,
		required: true
	},
	startTime: {
		type: Date,
		required: true
	}
})

module.exports = { Reservation }
