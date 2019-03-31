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
	email: {
		type: String,
		required: true,
		unique: true,
		index: true
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
