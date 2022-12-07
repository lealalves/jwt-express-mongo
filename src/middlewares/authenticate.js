require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
	const authHeader = req.headers.authorization

	if(!authHeader){
		return res.status(401).send({error: true, mensagem: 'Token not provided'})
	}

	const parts = authHeader.split(" ")

	if(parts.length !== 2){
		return res.status(401).send({error: true, mensagem: 'Invalid token type'})
	}

	const [scheme, token] = parts

	if(scheme.indexOf("Bearer") !== 0){
		return res.status(401).send({error: true, mensagem: 'Token malformatted'})
	}


	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if(err) return res.status(401).send({error: true, mensagem: 'Invalid token/expired'})


		req.userLogged = decoded

		console.log(err);
		console.log(decoded);

		next()
	})

	next()
}