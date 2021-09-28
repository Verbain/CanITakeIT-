const db = require("../../db/db");

class typeController{
    async getTypePlats(req,res){
        try {
            await db.select().table('type_plats').then(function (ret){
                res.status(201).json(ret);
            });
        } catch (err){
            console.log(err);
        }
    }
    async getTypeStock(req,res){
        try {
            await db.select().table('type_stock').then(function (ret){
                res.status(201).json(ret);
            });
        } catch (err){
            console.log(err);
        }
    }
}

module.exports = new typeController();