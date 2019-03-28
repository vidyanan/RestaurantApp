const mongoose = require('mongoose')

const Review = mongoose.model('Review', {
	name: {
		type: String,
		required: true,
		unique: true,
		index: true
	},
	stars: {
		type: Number,
		required: true
	},
	comment: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
})

module.exports = { Review }
