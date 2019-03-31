const { Restaurant } = require('../../models/restaurant')

module.exports = (req, res) => {
  Restaurant.find({}).then((restaurant) => {
    if (!restaurant) {
      res.status(404).send()
    } else {
      let names = new Set()
      for (let i = 0; i < restaurant.length; i++){
          names.add(restaurant[i].name);
      }
      res.send(Array.from(names))
    }
  }).catch((error) => {
    res.status(500).send()
  })
}
