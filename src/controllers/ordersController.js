const db = require('../../db/db');
const ordersSerivce = require('../services/ordersService')

class ordersController{
    async createOrder(req, res){
        try {
            const id = await ordersSerivce.createOrder(req.body);
        } catch (err){
            console.log(err);
        }
    }
    async orderContent(req, res){
        const payload = {
            "orderId":req.session.order,
            "platId":req.params.ID
        }
        console.log(payload)
        try {
            const id = await ordersSerivce.orderContent(payload);
        } catch (err){
            console.log(err);
        }
    }
    async promoteStatus(req, res){
        const id = req.params.ID
        db.select().table('order_content').where({id:id}).first().then(async data =>{
            const payload = {
                "id":id,
                "status":data.status
            }
            console.log('my payload : ' + payload)
            try {
                const id = await ordersSerivce.promoteStatus(payload);
                res.redirect('/')
            } catch (err){
                console.log(err);
            }
        })
    }
    async deleteOrder(req, res){
        const id = req.params.ID
        try {
            await db('order_content').where({id : id}).del().then((ret) =>{
                res.redirect('/orderRecap')
            })
        } catch (err){
            console.log(err);
        }
    }
}

module.exports = new ordersController();