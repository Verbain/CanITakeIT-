const db = require ('../../db/db')
const recipeService = require('../services/recipesService')

class recipesController{
    // FOR EACH INGREDIENT OF THE RECIPE WE CREATE A ROW 
    async createRecipe(req, res){
        for (let x=0;x<req.body.rIngredient.length;x++){
            const payload = {
                "rPlat" : req.body.rPlat,
                "rIngredient" : req.body.rIngredient[x],
                "rQuantity" : req.body.rQuantity[x]
            }
            try {
                const id = await recipeService.createRecipe(payload);
            } catch (err){
                console.log(err);
            }
        }
        res.redirect('/viewMenu')
    }

}

module.exports = new recipesController()