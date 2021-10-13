const recipeDAO = require ('../dao/recipesDAO')

class recipesService{
    createRecipe(recipeDto){
        const{rPlat,rIngredient,rQuantity}=recipeDto;
        return recipeDAO.createRecipe(rPlat,rIngredient,rQuantity);
    }
}

module.exports = new recipesService()