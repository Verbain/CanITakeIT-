const db = require('../../db/db');

class menusDAO{
    async createMenus(mName,mPrice){
        const[ret] = await db('menus').insert({
            name: mName,
            price: mPrice
        }).returning('id');
        return ret;
    }
    async updateMenu(id, mName,mPrice){
        const [ret] = await db('menus').where({id: id}).update({name: mName,price:mPrice}).returning('id');
        return ret;
    }
}

module.exports = new menusDAO();