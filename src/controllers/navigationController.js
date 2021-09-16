const db = require('../../db/db');
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
    formMenu(req,res) {
        res.render('formMenus')
    }
    menu(req,res){
        db.select().table('menus').then(data =>{
            res.render('menu',{data});
        }).catch(err => res.status(400).json(err));
    }
    user(req,res){
        db.select().table('users').then(data =>{
            res.render('users',{data});
        }).catch(err=> res.status(400).json(err));
    }
}

module.exports = new navigationController();