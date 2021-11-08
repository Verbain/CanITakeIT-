const express = require('express')
const usersController = require('./src/controllers/usersController')
const navigationController = require('./src/controllers/navigationController')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();
const menusController = require('./src/controllers/menusController')
const dishController = require('./src/controllers/dishController')
const stockController = require('./src/controllers/stockController')
const recipeController = require('./src/controllers/recipesController')
const ordersController = require('./src/controllers/ordersController')

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
//set css for ejs
app.use(express.static(__dirname+'/style'))

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
app.get('/formRecipe',navigationController.formRecipe)
app.get('/recipe',navigationController.recipe)
app.get('/carte',navigationController.menuAndPlats)
app.get('/carte/:type',navigationController.menuAndPlats)
app.get('/orderRecap',navigationController.ordersRecap)
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
// GET DELETE USER
app.get('/deleteUser/:ID',usersController.deleteUser)
// POST LOGIN
app.post('/api/login',urlEncodedParser,usersController.loginUser)

//MENUS ROUTE
//POST CREATE
app.post('/newMenus',urlEncodedParser,menusController.createMenus)
// POST UPDATE
app.post('/updateMenus',urlEncodedParser,menusController.updateMenu)
//GET DELETE
app.get('/deleteMenus/:ID',menusController.deleteMenus)

//DISH ROUTE
app.post('/newDish',urlEncodedParser,dishController.createDish)
//POST UPDATE
app.post('/updateDish',urlEncodedParser,dishController.update)
//GET DELETE
app.get('/deleteDish/:ID',dishController.deleteDish)

//STOCK ROUTE
app.post('/newStock',urlEncodedParser,stockController.createStock)
//POST UPDATE
app.post('/updateNameStock',stockController.updateName)
app.post('/updateQuantityStock',stockController.updateQuantity)
app.post('/updateImgStock',stockController.updateImg)
app.post('/updateAllStock',urlEncodedParser,stockController.updateAll)
//GET DELETE
app.get('/deleteStock/:ID',stockController.deleteStock)

//POST CREATE 
app.post('/newRecipe',urlEncodedParser,recipeController.createRecipe)

//ORDERS ROUTE
//POST CREATE 
app.post('/newOrder',urlEncodedParser,ordersController.createOrder)
app.get('/orderContent/:ID',ordersController.orderContent)
app.get('/promoteStatus/:ID',ordersController.promoteStatus)
app.get('/deleteOrder/:ID',ordersController.deleteOrder)



app.listen(process.env.PORT,function(){
    console.log("app listening on port 3000")
})