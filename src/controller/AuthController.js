const express = require('express')
const userModel = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()

require('dotenv').config()

const generateToken = (user) => {
	return jwt.sign({
		id: user._id,
		name: user.name
	}, process.env.JWT_SECRET, { expiresIn: 86400 })
}

router.post('/register', async (req, res) => {  
	const {email} = req.body
	
	if(await userModel.findOne({email})){
		return res.status(400).send({
			error: true,
			mensagem: 'Usuário já existente'
		})
	}
	
	const user = await userModel.create(req.body)

	user.password = undefined

	return res.send({
		error: false,
		mensagem: 'Registrado com Sucesso!',
		user, 
    token: generateToken(user)
	})
})

router.post('/authenticate', async (req, res) => {
	const {email, password} = req.body

	const user = await userModel.findOne({email}).select('+password')

	if(!user){
		return res.status(400).send({error: true, mensagem:'Usuário não encontrado.'})
	}

	if(!await bcrypt.compare(password, user.password)){
		return res.status(400).send({error: true, mensagem:'Senha inválida'})
	}

	user.password = undefined

	res.send({
		user, 
		token: generateToken(user)})
})

module.exports = router
