const { Profile } = require('../../models/profile')

module.exports = (req, res) => {
  const e = req.query.email
  const pw = req.query.password
	Profile.find({ email:e, password:pw }).then((profile) => {
		if (!profile) {
			res.send()
		} else {
			res.send(profile[0].type)
		}
	}).catch((error) => {
		res.status(500).send()
	})
}
