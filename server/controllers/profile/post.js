const { Profile } = require('../../models/profile')

module.exports = (req, res) => {
	const profile = new Profile({
		firstname: req.query.firstname,
		lastname: req.query.lastname,
		address: req.query.address,
		email: req.query.email,
		password: req.query.password,
		phonenumber: req.query.phonenumber,
		birthday: req.query.birthday,
		type: req.query.type
	})

	if(profile.type != "user" && profile.type != "owner" && profile.type != "admin"){
		profile.type = "user";
	}

	profile.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error) // 400 for bad request
	})
}
