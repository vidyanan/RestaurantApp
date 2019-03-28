const { Restaurant } = require('../../models/restaurant')

module.exports = (req, res) => {
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
}
