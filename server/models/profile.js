const mongoose = require('mongoose')

const Profile = mongoose.model('Profile', {
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: false
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	phonenumber: {
		type: Number,
		required: false
	},
	birthday: {
		type: String,
		required: false
	},
	type: {
		type: String,
		required: true,
		default: 'user'
	}
})

module.exports = { Profile }
