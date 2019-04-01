const mongoose = require('mongoose')

const Restaurant = mongoose.model('Restaurant', {
	name: {
		type: String,
		required: true,
		unique: true,
		index: true
	},
	featuredImage: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true,
		unique: true,
		index: true
	},
	cuisine: {
		type: String,
		required: true
	},
	hours: {
		type: Array,
		required: true
	}
})


module.exports = { Restaurant }
