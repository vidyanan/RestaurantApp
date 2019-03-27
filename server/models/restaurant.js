const mongoose = require('mongoose')

const Restaurant = mongoose.model('Restaurant', {
	name: {
		type: String,
		unique: true,
		required: true
	},
	featuredImage: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	},
	location: {
		type: String,
		unique: true,
		required: true
	},
	cuisine: {
		type: String,
		required: true
	},
	cuisineImage: {
		type: String,
		required: true
	},
	hours: {
		type: Array,
		required: true
	}
})


module.exports = { Restaurant }
