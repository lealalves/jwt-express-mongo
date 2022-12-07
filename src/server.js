const express = require('express')
const app = express()

const AuthController = require('./controller/AuthController')
const AdminController = require('./controller/AdminController')

const authenticateMiddleware = require('./middlewares/authenticate')

app.use(express.json())

app.use('/auth', AuthController)
app.use('/admin', authenticateMiddleware, AdminController)


app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000, () => {
  console.log('server on http://localhost:3000');
})