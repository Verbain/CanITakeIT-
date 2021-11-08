const db = require('../../db/db');
const { update } = require('../dao/dishDAO');
// THIS IS NAVIGATION CONTROLLER FOR THE EJS 
class navigationController{
    homepage(req,res){
        const role = req.session.role
        const name = req.session.name
        const user_id = req.session.ID
        const table = req.session.table
        const type = req.params.type
        const total = 0
        if (role == "client"){
            //select les menus et les plats correspondant 
            db.select('plats.id','plats.name','plats.type','plats.description','type_plats.name AS type_name','plats.price').table('plats')
            .orderBy('plats.type','asc')
            .join('type_plats',{'type_plats.id':'plats.type'}).then(data =>{
                db.select().table('stock').then(dataS =>{
                    db.select().table('recipes').then(dataR =>{
                        res.render('carteMenus',{data,role,name,user_id,type,total,dataS,dataR})
                    })
                })
            }).catch(err => console(err))
        } else {
            //select order content of today && ready == false
            db.select().table('order_content').then(data =>{
                db.select().table('plats').then(dataP =>{
                    res.render('home',{role,name,user_id,table,data,dataP})
                })
            })            
        }
        
    }
    login(req,res){
        const role = req.session.role
        const name = req.session.name
        const user_id = req.session.ID
        res.render('login',{role,name,user_id})
    }
    logout(req,res){
        req.session.destroy();
        res.redirect('/')
    }
    formUser(req,res,ID) {
        const role = req.session.role
        const name = req.session.name
        const user_id = req.session.ID
        ID = req.params.ID
        let update = 0;
        if (!ID){
            const ROLE = req.params.role
            update = 0;
            res.render('formUser',{update,ROLE,role,name,user_id})
        } else {
            update = 1;
            db.select().table('users').where({id:ID}).first().then(dataU=>{
                res.render('formUser',{dataU,update,role,name,user_id})
            }).catch(err=>console.log(err));
        }
    }
    formMenu(req,res,ID) {
        const role = req.session.role
        const name = req.session.name
        const user_id = req.session.ID
        ID = req.params.ID
        let update = 0;
        if (!ID){
            update = 0;
            res.render('formMenus',{update,role,name,user_id})
        } else {
            update = 1;
            db.select().table('menus').where({id:ID}).first().then(dataU=>{
                res.render('formMenus',{dataU,update,role,name,user_id})
            }).catch(err=>console.log(err));
        }
    }
    menu(req,res){
        
        const role = req.session.role
        const name = req.session.name
        const user_id = req.session.ID
        db.select().table('menus').then(data =>{
            res.render('menu',{data,role,role,name,user_id});
        }).catch(err => res.status(400).json(err));
    }
    user(req,res){
        const role = req.session.role
        const name = req.session.name
        const user_id = req.session.ID
        db.select().table('users').then(data =>{
            res.render('users',{data,role,name,user_id});
        }).catch(err=> res.status(400).json(err));
    }
    formDish(req,res,ID){
        const role = req.session.role
        const name = req.session.name
        const user_id = req.session.ID
        ID = req.params.ID
        let update = 0;
        const chef_id = req.session.ID
        if (!ID){
        update = 0;
            db.select().table('type_plats').then(dataT=>{
                res.render('formDish',{chef_id,update,dataT,role,name,user_id});
            }).catch(err => res.status(400).json(err));
        } else {
            update = 1;
            db.select().table('plats').where({id:ID}).first().then(dataU =>{
                    db.select().table('type_plats').then(dataT=>{
                        res.render('formDish',{dataU,chef_id,update,dataT,role,name,user_id});
                    })
            }).catch(err => console.log(err));
        }
    }
    dish(req,res){
        const role = req.session.role
        const name = req.session.name
        const user_id = req.session.ID
        db.select('plats.id','plats.name','plats.type','plats.description',
        'plats.price','type_plats.name AS type_name').table('plats')
        .join('type_plats',{'type_plats.id':'plats.type'}).then(data =>{
            res.render('dish',{data,role,name,user_id});
        }).catch(err=> console.log(err));
    }
    formStock(req,res,ID){
        const role = req.session.role
        const name = req.session.name
        const user_id = req.session.ID
        ID = req.params.ID
        let update = 0;
        if (!ID){
            update = 0;
            db.select().table('type_stock').then(data=>{
                res.render('formStock',{data,update,role,name,user_id})
            }).catch(err => console.log(err));
        } else {
            update = 1 ;
            db.select().table('stock').where({id:ID}).first().then(dataU =>{
                db.select().table('type_stock').then(data=>{
                    res.render('formStock',{data,update,dataU,role,name,user_id})
                })
            }).catch(err => console.log(err));
        }
    }
    stock(req,res){
        const role = req.session.role
        const name = req.session.name
        const user_id = req.session.ID
        db.select('stock.id','stock.quantity','stock.name','type_stock.name AS type_name',
        'stock.img').table('stock').join('type_stock',{'type_stock.id':'stock.type'}).then(data =>{
            res.render('stock',{data,role,name,user_id})
        }).catch(err=>console.log(err));
    }
    formRecipe(req,res){
        const role = req.session.role
        const name = req.session.name
        const user_id = req.session.ID
        db.select().table('stock').then(dataS =>{
            db.select().table('plats').then(data=>{
                res.render('formRecipe',{data,dataS,role,name,user_id});
            }).catch(err=>console.log(err))
        })  
    }
    recipe(req,res){
        const role = req.session.role
        const name = req.session.name
        const user_id = req.session.ID
        const platID=req.params.platID
        db.select().table('recipes').where({id_plat:platID}).then(data=>{
            res.render('recipe',{data,role,name,user_id})
        }).catch(err => console(err))
    }
    menuAndPlats(req,res){
        const role = req.session.role
        const name = req.session.name
        const user_id = req.session.ID
        const type = req.params.type
        db.select('plats.id','plats.name','plats.type','plats.description','type_plats.name AS type_name','plats.price').table('plats')
        .orderBy('plats.type','asc')
        .join('type_plats',{'type_plats.id':'plats.type'}).then(data =>{
            res.render('carteMenus',{data,role,name,user_id,type})
        }).catch(err => console(err))
    }

    ordersRecap(req,res){
        const role = req.session.role
        const name = req.session.name
        const user_id = req.session.ID
        const orderId = req.session.order
        const total = 0
        db.select().table('order_content').where({order_id : orderId}).then(data =>{
            db.select().table('plats').then(dataP =>{
                res.render('orderRecap',{data,role,name,user_id,dataP,total})
            })
        })
    }

    contentByType(req,res){
        const role = req.session.role
        const name = req.session.name
        const user_id = req.session.ID
        const type = req.params.type
        db.select('plats.id','plats.name','plats.type','plats.description','type_plats.name AS type_name','plats.price').table('plats')
        .orderBy('plats.type','asc')
        .join('type_plats',{'type_plats.id':'plats.type'}).then(data =>{
            db.select().table('order_content').then(dataC =>{
                res.render('carteMenus',{data,role,name,user_id,type})
            })
        }).catch(err => console(err))
    }
}

module.exports = new navigationController();