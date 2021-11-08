const db = require("../../db/db");
const dishService = require("../services/dishService");
const recipesService = require("../services/recipesService")

class dishController{
    async createDish(req, res){
        try {
            db.select().table('type_plats').where({id : req.body.dType}).first().then(async (data) =>{
                if(data.name == "boisson"){
                    db.select().table('stock').where({name: req.body.dName}).first().then(async (dataS) =>{
                        const id = await dishService.createDish(req.body);
                        const payload = {
                            "rPlat":id,
                            "rIngredient":dataS.id,
                            "rQuantity":1
                        }
                        recipesService.createRecipe(payload)
                    })
                } else {
                    const id = await dishService.createDish(req.body);
                }
            })
            res.redirect('/viewDish')
        } catch (err){
            console.log(err);
        }
    }
    async update(req, res){
        console.log(req.body)
        try {
            const id = await dishService.update(req.body);
            res.redirect('/viewDish')
        } catch (err){
            console.log(err);
        }
    }
    async deleteDish(req, res,id){
        id = req.params.ID
        try {
            await db('plats').where({id : id}).del().then((ret) =>{
                res.redirect('/viewDish')
            })
        } catch (err){
            console.log(err);
        }
    }
}
module.exports = new dishController()