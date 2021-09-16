const db = require('../../db/db');
const menusService = require('../services/menusService');

class menusController{
    async createMenus(req, res){
        try {
            const id = await menusService.createMenus(req.body);
            res.redirect('/viewMenu')
        } catch (err){
            console.log(err);
        }
    }
    async updateName(req, res){
        try {
            const id = await menusService.updateName(req.body);
            res.status(201).json({
                id:id,
                status:201,
                response:"menus Name updated",
                data:req.body
            });
        } catch (err){
            console.log(err);
        }
    }
    async getMenus(req,res){
        try {
            await db.select().table('menus').then(function (ret){
                res.status(201).json(ret);
            });
        } catch (err){
            console.log(err);
        }
    }

}

module.exports = new menusController();