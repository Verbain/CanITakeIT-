const db = require('../../db/db')
const ordersDAO = require('../dao/ordersDAO')

class ordersService{
    createOrder(ordersDto){
        const{userId,tableId}=ordersDto;
        return ordersDAO.createOrder(userId,tableId);
    }
    orderContent(ordersDto){
        const{orderId,platId}=ordersDto;
        return ordersDAO.orderContent(orderId,platId);
    }
    promoteStatus(dishDto){
        const{id,status}=dishDto;
        return ordersDAO.promoteStatus(id,status);
    }
}

module.exports = new ordersService()