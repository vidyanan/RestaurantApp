const { Profile } = require('../../models/profile')

module.exports = (req, res) => {
	Profile.find(req.query).then((profile) => {
		if (!profile) {
			res.status(404).send()
		} else {
			res.send(profile)
		}
	}).catch((error) => {
		res.status(500).send()
	})
}
