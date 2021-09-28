const db = require("../../db/db");

class stockDAO{
    async createStock(sName,sType,sQuantity,sImg){
        const[ret] = await db('stock').insert({
            name: sName,
            type: sType,
            quantity: sQuantity,
            img: sImg
        }).returning('id');
        return ret;
    }
    async updateName(id, sName){
        const [ret] = await db('stock').where({id: id}).update({name: sName}).returning('id');
        return ret;
    }
    async updateQuantity(id, sQuantity){
        const [ret] = await db('stock').where({id: id}).update({quantity: sQuantity}).returning('id');
        return ret;
    }
    async updateImg(id, sImg){
        const [ret] = await db('stock').where({id: id}).update({img: sImg}).returning('id');
        return ret;
    }
    async updateAll(id,sName,sType , sQuantity, sImg){
        const [ret] = await db('stock').where({id:id}).update({name: sName,type:sType, quantity: sQuantity,img: sImg}).returning('id');
        return ret;
    }
}

module.exports = new stockDAO();