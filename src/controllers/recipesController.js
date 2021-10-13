const db = require ('../../db/db')
const recipeService = require('../services/recipesService')

class recipesController{
    async createRecipe(req, res){
        console.log(req.body)
        console.log("quantity"+req.body.rQuantity[1])
        console.log("body lenght" + req.body.rQuantity.length)
        for (let x=0;x<req.body.rIngredient.length;x++){
            const payload = {
                "rPlat" : req.body.rPlat,
                "rIngredient" : req.body.rIngredient[x],
                "rQuantity" : req.body.rQuantity[x]
            }
            console.log(`payload ${x}` + Object.values(payload))
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