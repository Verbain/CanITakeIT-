const db = require('../../db/db')

class ordersDAO{
    async createOrder(userId,tableId){
        const[ret] = await db('orders').insert({
            user_id:userId,
            id_table:tableId,
            is_done:false
        }).returning('id');
        return ret;
    }
    async orderContent(orderId,platId){
        const[ret] = await db('order_content').insert({
            order_id:orderId,
            plats_id:platId,
            status:"waiting"
        }).returning('id');
        return ret;
    }
    async promoteStatus(id,status){ 
        console.log(status)
        if (status == 'waiting'){
            const [ret] = await db('order_content').where({id: id}).update({status:'preparation'}).returning('id');
            return ret;
        } else if (status == 'preparation'){
           const [ret] = await db('order_content').where({id: id}).update({status:'ready'}).returning('id');
           return ret;
        }
    }
}

module.exports = new ordersDAO();