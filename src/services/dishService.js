const dishDAO = require('../dao/dishDAO')
class dishService{
    createDish(dishDto){
        const{dName,dType,dPrice,uId,dDesc}=dishDto;
        return dishDAO.createDish(dName,dType,dPrice,uId,dDesc);
    }
    update(dishDto){
        const{id,dName,dType,dPrice,uId,dDesc}=dishDto;
        return dishDAO.update(id,dName,dType,dPrice,uId,dDesc);
    }

}

module.exports = new dishService();