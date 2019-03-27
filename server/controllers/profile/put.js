const { Profile } = require('../../models/profile')

module.exports = (req, res) => {
  const e = req.query.email

	Profile.findOneAndUpdate({email : e}, {$set: req.query},  {new: true}).then((profile) => {
		if (!profile) {
			res.status(404).send()
		} else {
			res.send(profile)
		}
	}).catch((error) => {
		res.status(500).send()
	})
}
