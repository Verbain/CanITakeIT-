const dishDAO = require('../dao/dishDAO')
class dishService{
    createDish(dishDto){
        const{dName,dType,mId,uId}=dishDto;
        return dishDAO.createDish(dName,dType,mId,uId);
    }
    update(dishDto){
        const{id,dName,dType,mId,uId}=dishDto;
        return dishDAO.update(id,dName,dType,mId,uId);
    }

}

module.exports = new dishService();