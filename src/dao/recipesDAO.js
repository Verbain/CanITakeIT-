const db = require('../../db/db')

class recipesDAO{
    async createRecipe(rPlat,rIngredient,rQuantity){
        const[ret] = await db('recipes').insert({
            id_plat: rPlat,
            id_stock: rIngredient,
            quantity: rQuantity
        }).returning('id');
        return ret;
    }
}

module.exports = new recipesDAO()