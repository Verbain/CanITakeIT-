const db = require('../../db/db');
const menusDAO = require('../dao/menusDAO');

class menusService{
    createMenus(menusDto){
        const{mName,mPrice}=menusDto;
        return menusDAO.createMenus(mName,mPrice);
    }
    updateMenu(menusDto){
        const{id,mName,mPrice}=menusDto;
        return menusDAO.updateMenu(id,mName,mPrice);
    }
}

module.exports = new menusService();