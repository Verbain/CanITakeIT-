const dishDAO = require('../dao/dishDAO')
class dishService{
    createDish(dishDto){
        const{dName,dType,mId}=dishDto;
        return dishDAO.createDish(dName,dType,mId);
    }
    updateName(dishDto){
        const{id,dName}=dishDto;
        return dishDAO.updateName(id,dName);
    }

}

module.exports = new dishService();