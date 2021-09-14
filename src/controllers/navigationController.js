class navigationController{
    homepage(req,res){
        const role = req.session.role
        res.render('home',{role})
    }
    login(req,res){
        res.render('login')
    }
    logout(req,res){
        req.session.destroy();
        res.redirect('/')
    }
}

module.exports = new navigationController();