const db = require('../../db/db');

class dishDAO{
    async createDish(dName,dType,dPrice,uId,dDesc){
        const[ret] = await db('plats').insert({
            name: dName,
            type: dType,
            price: dPrice,
            id_user: uId,
            description: dDesc
        }).returning('id');
        return ret;
    }
    async update(id, dName,dType,dPrice,uId,dDesc){ 
        const [ret] = await db('plats').where({id: id}).update({name: dName,type:dType,price:dPrice,id_user:uId,description:dDesc}).returning('id');
        return ret;
    }
}
module.exports = new dishDAO();