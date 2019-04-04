const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types;

const Review = mongoose.model('Review', {
	name: {
		type: String,
		required: true,
    unique: false
	},
	restaurantId: {
    type: ObjectId,
		required: true
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
