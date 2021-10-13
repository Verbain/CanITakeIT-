const { stock } = require("../controllers/navigationController");
const stockDAO = require("../dao/stockDAO");

class stockService{
    createStock(stockDto){
        const{sName,sType,sQuantity,sImg}=stockDto;
        return stockDAO.createStock(sName,sType,sQuantity,sImg);
    }
    updateName(stockDto){
        const{id,sName}=stockDto;
        return stockDAO.updateName(id,sName);
    }
    updateQuantity(stockDto){
        const{id,sQuantity}=stockDto;
        return stockDAO.updateQuantity(id,sQuantity);
    }
    updateImg(stockDto){
        const{id,sImg}=stockDto;
        return stockDAO.updateName(id,sImg);
    }
    updateAll(stockDTO){
        const{id,sType,sName,sQuantity,sImg} = stockDTO;
        return stockDAO.updateAll(id,sName,sType,sQuantity,sImg)
    }
}

module.exports = new stockService();