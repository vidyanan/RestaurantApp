const { Profile } = require('../../models/profile')

module.exports = (req, res) => {
  Profile.findOneAndDelete(req.query).then((profile) => {
		if (!profile) {
			res.status(404).send()
		} else {
			res.status(202).send() //Accepted status
		}
	}).catch((error) => {
		res.status(500).send()
	})
}
