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
	hours: {
		type:
		{ mon: {type: String},
			tues: {type: String},
			wed: {type: String},
			thurs: {type: String},
			fri: {type: String},
			sat: {type: String},
			sun: {type: String}
		},
		required: true
	}
})


module.exports = { Restaurant }
