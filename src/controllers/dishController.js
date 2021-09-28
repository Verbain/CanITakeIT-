const db = require("../../db/db");
const dishService = require("../services/dishService");

class dishController{
    async createMenus(req, res){
        try {
            console.log(req.body)
            const id = await dishService.createDish(req.body);
            res.redirect('/viewDish')
        } catch (err){
            console.log(err);
        }
    }
    async update(req, res){
        console.log(req.body)
        try {
            const id = await dishService.update(req.body);
            res.redirect('/viewDish')
        } catch (err){
            console.log(err);
        }
    }
}
module.exports = new dishController()