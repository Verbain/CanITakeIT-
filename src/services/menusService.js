const db = require('../../db/db');
const menusDAO = require('../dao/menusDAO');

class menusService{
    createMenus(menusDto){
        const{mName}=menusDto;
        return menusDAO.createMenus(mName);
    }
    updateName(menusDto){
        const{id,mName}=menusDto;
        return menusDAO.updateName(id,mName);
    }
}

module.exports = new menusService();