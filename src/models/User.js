const mongoose = require('../database')
const bcryt = require('bcrypt')

const userSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	password:{
		type: String,
		required: true,
		select: false
	},
	createAt:{
		type: Date,
		default: Date.now
	}
})

userSchema.pre('save', async function(next) {
  const hash = await bcryt.hash(this.password, 10)
  this.password = hash
})

const User = mongoose.model('User', userSchema)

module.exports = User