const mongoose = require('mongoose')

const Reservation = mongoose.model('Reservation', {
	name: {
		type: String,
		required: true,
		unique: true,
		index: true
	},
	location: {
		type: String,
		required: true,
		unique: true,
		index: true
	},
	phonenumber: {
		type: Number,
		required: false
	},
	host: {
		type: String,
		required: false
	},
	table: {
		type: Number,
		required: true
	},
	seats: {
		type: Number,
		required: false
	},
	startTime: {
		type: Date,
		required: true
	}
})

module.exports = { Reservation }
