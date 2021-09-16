const db = require('../../db/db');

class menusDAO{
    async createMenus(mName){
        const[ret] = await db('menus').insert({
            name: mName
        }).returning('id');
        return ret;
    }
    async updateName(id, mName){
        const [ret] = await db('menus').where({id: id}).update({name: mName}).returning('id');
        return ret;
    }
}

module.exports = new menusDAO();