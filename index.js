const express = require('express')
const usersController = require('./src/controller/usersController')
const app = express()
const cors = require('cors');
const session = require('express-session');

app.use(express.json());
app.use(cors());
app.use(session({
    secret:'secret-key',
    resave:false,
    saveUninitialized: false
}))

app.get('/', function (req, res) {
    res.send('Hello World from express')
})
//users route
//GET
app.get('/users',usersController.getAllUsers)
// POST CREATE USERS
app.post('/newChef',usersController.createChef)
app.post('/newServeur',usersController.createServeur)
// POST UPDATE USERS
app.post('/updateNameUser',usersController.updateName)
app.post('/updateLastnameUser',usersController.updateLastname)
app.post('/updateRoleUser',usersController.updateRole)
// POST LOGIN
app.post('/login',usersController.loginUser)

app.listen(3000,function(){
    console.log("app listening on port 3000")
})