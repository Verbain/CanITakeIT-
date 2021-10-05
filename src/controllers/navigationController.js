const db = require('../../db/db');
const { update } = require('../dao/dishDAO');
class navigationController{
    homepage(req,res){
        const role = req.session.role
        const name = req.session.name
        res.render('home',{role,name})
    }
    login(req,res){
        res.render('login')
    }
    logout(req,res){
        req.session.destroy();
        res.redirect('/')
    }
    formUser(req,res,ID) {
        ID = req.params.ID
        let update = 0;
        if (!ID){
            const ROLE = req.params.role
            console.log(ROLE)
            console.log("create mode")
            update = 0;
            res.render('formUser',{update,ROLE})
        } else {
            console.log('update mode')
            update = 1;
            db.select().table('users').where({id:ID}).first().then(dataU=>{
                res.render('formUser',{dataU,update})
            }).catch(err=>console.log(err));
        }
    }
    formMenu(req,res,ID) {
        ID = req.params.ID
        let update = 0;
        if (!ID){
            console.log("create mode")
            update = 0;
            res.render('formMenus',{update})
        } else {
            console.log('update mode')
            update = 1;
            db.select().table('menus').where({id:ID}).first().then(dataU=>{
                res.render('formMenus',{dataU,update})
            }).catch(err=>console.log(err));
        }
    }
    menu(req,res){
        const role = req.session.role
        const name = req.session.name
        db.select().table('menus').then(data =>{
            res.render('menu',{data,role});
        }).catch(err => res.status(400).json(err));
    }
    user(req,res){
        const role = req.session.role
        const name = req.session.name
        db.select().table('users').then(data =>{
            res.render('users',{data,role});
        }).catch(err=> res.status(400).json(err));
    }
    formDish(req,res,ID){
        ID = req.params.ID
        let update = 0;
        const chef_id = req.session.ID
        if (!ID){
        console.log("create mode")
        update = 0;
        db.select().table('menus').then(data =>{
            db.select().table('type_plats').then(dataT=>{
                res.render('formDish',{data,chef_id,update,dataT});
            })
        }).catch(err => res.status(400).json(err));
        } else {
            console.log('update mode')
            update = 1;
            db.select().table('plats').where({id:ID}).first().then(dataU =>{
                db.select().table('menus').then(data =>{
                    db.select().table('type_plats').then(dataT=>{
                        res.render('formDish',{dataU,data,chef_id,update,dataT});
                    })
                }).catch(err => console.log(err));
            });
        }
    }
    dish(req,res){
        const role = req.session.role
        const name = req.session.name
        db.select('menus.id','plats.id','plats.name','plats.type',
        'plats.id_menus','menus.name AS menu_name','type_plats.name AS type_name').table('plats')
        .join('menus',{'menus.id' : 'plats.id_menus'})
        .join('type_plats',{'type_plats.id':'plats.type'}).then(data =>{
            res.render('dish',{data,role});
        }).catch(err=> console.log(err));
    }
    formStock(req,res,ID){
        ID = req.params.ID
        let update = 0;
        if (!ID){
            console.log("create mode")
            update = 0;
            db.select().table('type_stock').then(data=>{
                res.render('formStock',{data,update})
            }).catch(err => console.log(err));
        } else {
            update = 1 ;
            db.select().table('stock').where({id:ID}).first().then(dataU =>{
                db.select().table('type_stock').then(data=>{
                    res.render('formStock',{data,update,dataU})
                })
            }).catch(err => console.log(err));
        }
    }
    stock(req,res){
        const role = req.session.role
        const name = req.session.name
        db.select('stock.id','stock.quantity','stock.name','type_stock.name AS type_name','stock.img').table('stock').join('type_stock',{'type_stock.id':'stock.type'}).then(data =>{
            res.render('stock',{data,role})
        }).catch(err=>console.log(err));
    }
}

module.exports = new navigationController();