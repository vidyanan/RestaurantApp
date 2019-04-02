const mongoose = require('mongoose')

module.exports = function connectToDatabase(mongoUrl) {
  return mongoose.connect(mongoUrl, { useNewUrlParser: true });
}
