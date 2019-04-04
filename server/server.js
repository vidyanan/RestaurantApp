'use strict'
const log = console.log

const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const connectToDatabase = require('./db/mongoose');
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/API';

connectToDatabase(mongoUrl)
// express
const app = express();
// body-parser middleware - will parse the JSON and convert to object
app.use(bodyParser.json())

app.use(express.static(path.resolve('../client')));

app.use(function(req, res, next) {
  log(req.method + ' ' + req.url)
  next()
});

//****************************************************************************//
//                                Profile                                     //
//****************************************************************************//
const profilePost = require('./controllers/profile/post');
const profileGetById = require('./controllers/profile/getById');
const profileGetAll = require('./controllers/profile/get');
const profileLogin = require('./controllers/profile/login');
const profileDelete = require('./controllers/profile/delete');
const profilePut = require('./controllers/profile/put');

app.post('/profile', profilePost)
app.get('/profile/:id', profileGetById)
app.get('/profile', profileGetAll)
app.get('/login', profileLogin)
app.delete('/profile', profileDelete)
app.put('/profile', profilePut)

//****************************************************************************//
//                                Restaurant                                  //
//****************************************************************************//
const restaurantPost = require('./controllers/restaurant/post');
const restaurantGetById = require('./controllers/restaurant/getById');
const restaurantGetBySlug = require('./controllers/restaurant/getBySlug');
const restaurantGet = require('./controllers/restaurant/get');
const restaurantName = require('./controllers/restaurant/name');
const restaurantLocation = require('./controllers/restaurant/location');
const restaurantCuisine = require('./controllers/restaurant/cuisine/index');
const restaurantCuisineFeatured = require('./controllers/restaurant/cuisine/featured');
const restaurantHours = require('./controllers/restaurant/hours');
const restaurantDelete = require('./controllers/restaurant/delete');
const restaurantPut = require('./controllers/restaurant/put');

app.post('/restaurant', restaurantPost)
app.get('/restaurant/:id', restaurantGetById)
app.get('/restaurant/slug/:slug', restaurantGetBySlug)
app.get('/restaurant', restaurantGet)
app.get('/restaurant/name', restaurantName)
app.get('/location', restaurantLocation)
app.get('/cuisine', restaurantCuisine)
app.get('/cuisine/featured', restaurantCuisineFeatured)
app.get('/hours', restaurantHours)
app.delete('/restaurant', restaurantDelete)
app.put('/restaurant', restaurantPut)


//****************************************************************************//
//                                Review                                      //
//****************************************************************************//
const reviewPost = require('./controllers/review/post');
const reviewGetById = require('./controllers/review/getById');
const reviewGet = require('./controllers/review/get');
const reviewDelete = require('./controllers/review/delete');
const reviewPut = require('./controllers/review/put');

app.post('/review', reviewPost)
app.get('/review/:id', reviewGetById)
app.get('/review', reviewGet)
app.delete('/review', reviewDelete)
app.put('/review', reviewPut)

//****************************************************************************//
//                                Reservation                                 //
//****************************************************************************//
const reservationPost = require('./controllers/reservation/post');
const reservationGetById = require('./controllers/reservation/getById');
const reservationGet = require('./controllers/reservation/get');
const reservationGetRange = require('./controllers/reservation/getRange');
const reservationDelete = require('./controllers/reservation/delete');
const reservationPut = require('./controllers/reservation/put');

app.post('/reservation', reservationPost)
app.get('/reservation/:id', reservationGetById)
app.get('/reservation', reservationGet)
app.get('/reservation/:id/:start/:end', reservationGetRange);
app.delete('/reservation', reservationDelete)
app.put('/reservation', reservationPut)



app.listen(port, () => {
	log(`Listening on port ${port}...`)
})
