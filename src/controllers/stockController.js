const db = require("../../db/db");
const stockService = require("../services/stockService");

class stockController{
    async createStock(req, res){
        try {
            const id = await stockService.createStock(req.body);
            res.redirect('/viewStock')
        } catch (err){
            console.log(err);
        }
    }
    async updateName(req, res){
        try {
            const id = await stockService.updateName(req.body);
            res.status(201).json({
                id:id,
                status:201,
                response:"stock Name updated",
                data:req.body
            });
        } catch (err){
            console.log(err);
        }
    }
    async updateQuantity(req, res){
        try {
            const id = await stockService.updateQuantity(req.body);
            res.status(201).json({
                id:id,
                status:201,
                response:"stock Quantity updated",
                data:req.body
            });
        } catch (err){
            console.log(err);
        }
    }
    async updateImg(req, res){
        try {
            const id = await stockService.updateImg(req.body);
            res.status(201).json({
                id:id,
                status:201,
                response:"stock Img updated",
                data:req.body
            });
        } catch (err){
            console.log(err);
        }
    }
    async updateAll(req, res){
        try {
            const id = await stockService.updateAll(req.body);
            res.redirect('/viewStock')
        } catch (err){
            console.log(err);
        }
    }

}

module.exports = new stockController();