const express = require('express')
const usersController = require('./src/controllers/usersController')
const navigationController = require('./src/controllers/navigationController')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors');
const session = require('express-session');
const menusController = require('./src/controllers/menusController')
const dishController = require('./src/controllers/dishController')
const stockController = require('./src/controllers/stockController')

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
app.get('/formMenus',navigationController.formMenu)
app.get('/formMenus/:ID',navigationController.formMenu)
app.get('/formDish',navigationController.formDish)
app.get('/formDish/:ID',navigationController.formDish)
app.get('/viewMenu',navigationController.menu)
app.get('/viewUser',navigationController.user)
app.get('/formuser/new/:role',navigationController.formUser)
app.get('/formUser/:ID',navigationController.formUser)
app.get('/viewDish',navigationController.dish)
app.get('/viewStock',navigationController.stock)
app.get('/formStock',navigationController.formStock)
app.get('/formStock/:ID',navigationController.formStock)
//users route
//GET
app.get('/users',usersController.getAllUsers)
// POST CREATE USERS
app.post('/newChef',urlEncodedParser,usersController.createChef)
app.post('/newClient',urlEncodedParser,usersController.createClient)
// POST UPDATE USERS
app.post('/updateNameUser',usersController.updateName)
app.post('/updateLastnameUser',usersController.updateLastname)
app.post('/updateRoleUser',usersController.updateRole)
app.post('/updateUser',urlEncodedParser,usersController.updateUser)
// POST LOGIN
app.post('/api/login',urlEncodedParser,usersController.loginUser)

//MENUS ROUTE
//POST CREATE
app.post('/newMenus',urlEncodedParser,menusController.createMenus)
// POST UPDATE
app.post('/updateMenus',menusController.updateMenu)

//DISH ROUTE
app.post('/newDish',urlEncodedParser,dishController.createMenus)
//POST UPDATE
app.post('/updateDish',urlEncodedParser,dishController.update)

//STOCK ROUTE
app.post('/newStock',urlEncodedParser,stockController.createStock)
//POST UPDATE
app.post('/updateNameStock',stockController.updateName)
app.post('/updateQuantityStock',stockController.updateQuantity)
app.post('/updateImgStock',stockController.updateImg)
app.post('/updateAllStock',urlEncodedParser,stockController.updateAll)

app.listen(3000,function(){
    console.log("app listening on port 3000")
})