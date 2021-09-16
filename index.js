const express = require('express')
const usersController = require('./src/controllers/usersController')
const navigationController = require('./src/controllers/navigationController')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors');
const session = require('express-session');
const menusController = require('./src/controllers/menusController')

const urlEncodedParser = bodyParser.urlencoded({extended : false})

app.use(express.json());
app.use(cors());
app.use(session({
    secret:'secret-key',
    resave:false,
    saveUninitialized: false
}))
//set templating engine
app.set('view engine','ejs')

//ROUNTING
app.get('/', navigationController.homepage)
app.get('/login',navigationController.login)
app.get('/logout',navigationController.logout)
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
app.post('/api/login',urlEncodedParser,usersController.loginUser)

//MENUS ROUTE
//POST CREATE
app.post('/menus',menusController.createMenus)
// POST UPDATE
app.post('/updateNameMenus',menusController.updateName)

app.listen(3000,function(){
    console.log("app listening on port 3000")
})