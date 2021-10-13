const dishDAO = require('../dao/dishDAO')
class dishService{
    createDish(dishDto){
        const{dName,dType,mId,uId,dDesc}=dishDto;
        return dishDAO.createDish(dName,dType,mId,uId,dDesc);
    }
    update(dishDto){
        const{id,dName,dType,mId,uId,dDesc}=dishDto;
        return dishDAO.update(id,dName,dType,mId,uId,dDesc);
    }

}

module.exports = new dishService();