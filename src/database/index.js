const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI, {}, (err) => {
  if(err) return console.log(err)

  console.log('Banco conectado.');
})

mongoose.Promise = global.Promise

module.exports = mongoose