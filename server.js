const express = require('express')
const app = express()
var cors = require('cors')
const connectDB = require('./config/db')
var bodyparser = require('body-parser')
const PORT = process.env.PORT || 4646

//Init Middleware
app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

//Mongo Connect
connectDB()


//Define Routes
app.get('/', (req, res) => res.send('Hello!'))
app.use('/auth', require('./routes/api/auth'))
app.use('/user', require('./routes/api/user'))
app.use('/type', require('./routes/api/type'))
app.use('/pokemon', require('./routes/api/pokemon'))
app.use('/myteam', require('./routes/api/myteam'))
app.use('/team', require('./routes/api/team'))


const server = app.listen(PORT, () => {console.log(`Listening on: ${PORT}`)})

module.exports = {app , server}