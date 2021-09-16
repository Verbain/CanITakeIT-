const db = require('../../db/db');

class dishDAO{
    async createDish(dName,dType,mId){
        mId = await db.select().table('menus').where({name: mId}).first()
        const[ret] = await db('plats').insert({
            name: dName,
            type: dType,
            id_menus: mId.id
        }).returning('id');
        return ret;
    }
    async updateName(id, dName){
        const [ret] = await db('menus').where({id: id}).update({name: dName}).returning('id');
        return ret;
    }
}
module.exports = new dishDAO();