const mongoose = require('mongoose')

const Reservation = mongoose.model('Reservation', {
	name: {
		type: String,
		required: true,
		unique: true
	},
	location: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	host: {
		type: String,
		required: false
	},
	table: {
		type: Number,
		required: true
	},
	startTime: {
		type: Date,
		required: true
	},
	endTime: {
		type: Date,
		required: true
	}
})

module.exports = { Reservation }
