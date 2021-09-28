const db = require('../../db/db');

class dishDAO{
    async createDish(dName,dType,mId,uId){
        const[ret] = await db('plats').insert({
            name: dName,
            type: dType,
            id_menus: mId,
            id_user: uId
        }).returning('id');
        return ret;
    }
    async update(id, dName,dType,mId,uId){ 
        const [ret] = await db('plats').where({id: id}).update({name: dName,type:dType,id_menus:mId,id_user:uId}).returning('id');
        return ret;
    }
}
module.exports = new dishDAO();