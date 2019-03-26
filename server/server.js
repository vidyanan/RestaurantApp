'use strict'
const log = console.log

const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const { ObjectID } = require('mongodb')

const { mongoose } = require('./db/mongoose')

// import the model
const { Profile } = require('./models/profile')
const { Restaurant } = require('./models/restaurant')
const { Review } = require('./models/review')
const { Reservation } = require('./models/reservation')

// express
const app = express();
// body-parser middleware - will parse the JSON and convert to object
app.use(bodyParser.json())


app.use(express.static(path.resolve('../client')));


//****************************************************************************//
//                                Profile                                     //
//****************************************************************************//
app.post('/profile', (req, res) => {
	log('POST ' + '/profile ' + req.query)

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
})

app.get('/profile/:id', (req, res) => {
	log('GET' + '/profile/:id ' + req.params)

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
})

app.get('/profile', (req, res) => {
	log('GET ' + '/profile ' + req.query)

	Profile.find(req.query).then((profile) => {
		if (!profile) {
			res.status(404).send()
		} else {
			res.send(profile)
		}
	}).catch((error) => {
		res.status(500).send()
	})
})

app.get('/login', (req, res) => {
	log('GET ' + '/login ' + req.query.email + ' ' + req.query.password)

	const e = req.query.email
	const pw = req.query.password

	Profile.find({ email: e, password: pw }).then((profile) => {
		if (!profile) {
			res.send()
		} else {
			res.send(profile[0].type)
		}
	}).catch((error) => {
		res.status(500).send()
	})
})

app.delete('/profile', (req, res) => {
	log('DELETE ' + '/profile ' + req.query)

	Profile.findOneAndDelete(req.query).then((profile) => {
		if (!profile) {
			res.status(404).send()
		} else {
			res.status(202).send() //Accepted status
		}
	}).catch((error) => {
		res.status(500).send()
	})
})

app.put('/profile', (req, res) => {
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
})

//****************************************************************************//
//                                Restaurant                                  //
//****************************************************************************//
app.post('/restaurant', (req, res) => {
	log('POST ' + '/restaurant ' + req.query)

	const restaurant = new Restaurant({
		name: req.query.name,
		featuredImage: req.query.featuredImage,
		url: req.query.url,
		location: req.query.location,
		cuisine: req.query.cuisine,
		hours: {mon: req.query.mon,
						tues: req.query.tues,
						wed: req.query.wed,
						thurs: req.query.thurs,
						fri: req.query.fri,
						sat: req.query.sat,
						sun: req.query.sun}
	})

	restaurant.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error)
	})
})

app.get('/restaurant/:id', (req, res) => {
	log('GET' + '/restaurant/:id ' + req.params)

	const id = req.params.id
	if (!ObjectID.isValid(id)) {
		res.status(404).send()
	}

	Restaurant.findById(id).then((restaurant) => {
		if (!restaurant) {
			res.status(404).send()
		} else {
			res.send(restaurant)
		}
	}).catch((error) => {
		res.status(500).send()
	})
})

app.get('/restaurant', (req, res) => {
	log('GET ' + '/restaurant ' + req.query)

	Restaurant.find(req.query).then((restaurant) => {
		if (!restaurant) {
			res.status(404).send()
		} else {
			res.send(restaurant)
		}
	}).catch((error) => {
		res.status(500).send()
	})
})

app.get('/restaurant/name', (req, res) => {
	log('GET ' + '/restaurant/name ')

	Restaurant.find({}).then((restaurant) => {
		if (!restaurant) {
			res.status(404).send()
		} else {
			let name = new Set()
			for (let i = 0; i < restaurant.length; i++){
					name.add(restaurant[i].name);
			}
			res.send(Array.from(name))
		}
	}).catch((error) => {
		res.status(500).send()
	})
})

app.get('/restaurant/location', (req, res) => {
	log('GET ' + '/restaurant/location ')

	Restaurant.find({}).then((restaurant) => {
		if (!restaurant) {
			res.status(404).send()
		} else {
			let locations = new Set()
			for (let i = 0; i < restaurant.length; i++){
					locations.add(restaurant[i].location);
			}
			res.send(Array.from(locations))
		}
	}).catch((error) => {
		res.status(500).send()
	})
})

app.get('/restaurant/cuisine', (req, res) => {
	log('GET ' + '/restaurant/cuisine ')

	Restaurant.find({}).then((restaurant) => {
		if (!restaurant) {
			res.status(404).send()
		} else {
			let cuisine = new Set()
			for (let i = 0; i < restaurant.length; i++){
					cuisine.add(restaurant[i].cuisine);
			}
			res.send(Array.from(cuisine))
		}
	}).catch((error) => {
		res.status(500).send()
	})
})

app.get('/restaurant/hours', (req, res) => {
	log('GET ' + '/restaurant/hours ')

	Restaurant.find({}).then((restaurant) => {
		if (!restaurant) {
			res.status(404).send()
		} else {
			let hours = new Set()
			for (let i = 0; i < restaurant.length; i++){
					hours.add(restaurant[i].hours);
			}
			res.send(Array.from(hours))
		}
	}).catch((error) => {
		res.status(500).send()
	})
})

app.delete('/restaurant', (req, res) => {
	log('DELETE ' + '/restaurant ' + req.query)

	Restaurant.findOneAndDelete(req.query).then((restaurant) => {
		if (!restaurant) {
			res.status(404).send()
		} else {
			res.status(202).send() //Accepted status
		}
	}).catch((error) => {
		res.status(500).send()
	})
})

app.put('/restaurant', (req, res) => {
	const n = req.query.name
	const l = req.query.location

	Restaurant.findOneAndUpdate({name : n, location: l}, {$set: req.query},  {new: true}).then((restaurant) => {
		if (!restaurant) {
			res.status(404).send()
		} else {
			res.send(restaurant)
		}
	}).catch((error) => {
		res.status(500).send()
	})
})

//****************************************************************************//
//                                Review                                      //
//****************************************************************************//
app.post('/review', (req, res) => {
	log('POST ' + '/review ' + req.query)

	const review = new Review({
		name: req.query.name,
		stars: req.query.stars,
		comment: req.query.comment
	})

	review.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error) // 400 for bad request
	})
})

app.get('/review/:id', (req, res) => {
	log('GET' + '/review/:id ' + req.params)

	const id = req.params.id
	if (!ObjectID.isValid(id)) {
		res.status(404).send()
	}

	Review.findById(id).then((review) => {
		if (!review) {
			res.status(404).send()
		} else {
			res.send(review)
		}
	}).catch((error) => {
		res.status(500).send()
	})
})

app.get('/review', (req, res) => {
	log('GET ' + '/review ' + req.query)

	Review.find(req.query).then((review) => {
		if (!review) {
			res.status(404).send()
		} else {
			res.send(review)
		}
	}).catch((error) => {
		res.status(500).send()
	})
})

app.delete('/review', (req, res) => {
	log('DELETE ' + '/review ' + req.query)

	Review.findOneAndDelete(req.query).then((review) => {
		if (!review) {
			res.status(404).send()
		} else {
			res.status(202).send() //Accepted status
		}
	}).catch((error) => {
		res.status(500).send()
	})
})

app.put('/review', (req, res) => {
	const n = req.query.name

	Review.findOneAndUpdate({name : n}, {$set: req.query},  {new: true}).then((review) => {
		if (!review) {
			res.status(404).send()
		} else {
			res.send(review)
		}
	}).catch((error) => {
		res.status(500).send()
	})
})

//****************************************************************************//
//                                Reservation                                 //
//****************************************************************************//
app.post('/reservation', (req, res) => {
	log('POST ' + '/reservation ' + req.query)

	const reservation = new Reservation({
		name: req.query.name,
		location: req.query.location,
		email: req.query.email,
		host: req.query.host,
		table: req.query.table,
		startTime: Date(req.query.startTime),
		endTime: Date(req.query.endTime)
	})

	reservation.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error) // 400 for bad request
	})
})

app.get('/reservation/:id', (req, res) => {
	log('GET' + '/reservation/:id ' + req.params)

	const id = req.params.id
	if (!ObjectID.isValid(id)) {
		res.status(404).send()
	}

	Reservation.findById(id).then((reservation) => {
		if (!reservation) {
			res.status(404).send()
		} else {
			res.send(reservation)
		}
	}).catch((error) => {
		res.status(500).send()
	})
})

app.get('/reservation', (req, res) => {
	log('GET ' + '/reservation ' + req.query)

	Reservation.find(req.query).then((reservation) => {
		if (!reservation) {
			res.status(404).send()
		} else {
			res.send(reservation)
		}
	}).catch((error) => {
		res.status(500).send()
	})
})

app.delete('/reservation', (req, res) => {
	log('DELETE ' + '/reservation ' + req.query)

	Reservation.findOneAndDelete(req.query).then((reservation) => {
		if (!reservation) {
			res.status(404).send()
		} else {
			res.status(202).send() //Accepted status
		}
	}).catch((error) => {
		res.status(500).send()
	})
})

app.put('/reservation', (req, res) => {
	const n = req.query.name
	const l = req.query.location
	const e = req.query.email

	Reservation.findOneAndUpdate({name : n, location: l, email: e}, {$set: req.query},  {new: true}).then((reservation) => {
		if (!reservation) {
			res.status(404).send()
		} else {
			res.send(reservation)
		}
	}).catch((error) => {
		res.status(500).send()
	})
})


app.listen(port, () => {
	log(`Listening on port ${port}...`)
})
