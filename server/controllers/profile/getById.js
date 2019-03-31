const { Profile } = require('../../models/profile')
const { ObjectID } = require('mongodb')

module.exports = (req, res) => {
  const id = req.params.id
	if (!ObjectID.isValid(id)) {
		res.status(404).send()
	}

	Profile.findById(id).then((profile) => {
		if (!profile) {
			res.status(404).send()
		} else {
			res.send(profile)
		}
	}).catch((error) => {
		res.status(500).send()
	})
}
