const db = require("../../db/db");
const dishService = require("../services/dishService");

class dishController{
    async createMenus(req, res){
        try {
            const id = await dishService.createDish(req.body);
            res.redirect('/viewDish')
        } catch (err){
            console.log(err);
        }
    }
    async updateName(req, res){
        try {
            const id = await dishService.updateName(req.body);
            res.status(201).json({
                id:id,
                status:201,
                response:"dish Name updated",
                data:req.body
            });
        } catch (err){
            console.log(err);
        }
    }
}
module.exports = new dishController()