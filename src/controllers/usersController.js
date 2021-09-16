const db = require('../../db/db');
const usersService = require('../services/usersService');

class usersController{
    async createChef(req, res){
        try {
            const id = await usersService.createChef(req.body);
            res.status(201).json({
                id:id,
                status:201,
                response:"new chef created",
                data:req.body
            });
        } catch (err){
            console.log(err);
        }
    }
    async createServeur(req, res){
        try {
            const id = await usersService.createServeur(req.body);
            res.status(201).json({
                id:id,
                status:201,
                response:"new serveur created",
                data:req.body
            });
        } catch (err){
            console.log(err);
        }
    }
    async updateName(req, res){
        try {
            const id = await usersService.updateName(req.body);
            res.status(201).json({
                id:id,
                status:201,
                response:"User Name updated",
                data:req.body
            });
        } catch (err){
            console.log(err);
        }
    }
    async updateLastname(req, res){
        try {
            const id = await usersService.updateLastname(req.body);
            res.status(201).json({
                id:id,
                status:201,
                response:"user LastName updated",
                data:req.body
            });
        } catch (err){
            console.log(err);
        }
    }
    async updateRole(req, res){
        try {
            const id = await usersService.updateRole(req.body);
            res.status(201).json({
                id:id,
                status:201,
                response:"user role updated",
                data:req.body
            });
        } catch (err){
            console.log(err);
        }
    }
    async  getAllUsers(req,res){
        try {
            await db.select().table('users').then(function (ret){
                res.status(201).json(ret);
            });
        } catch (err){
            console.log(err);
        }
    }
    async loginUser(req,res){
        try {
            const log = await usersService.login(req.body);
            if(log != 404)
            {
                if (log)
                {
                    req.session.role = log.role
                    req.session.name = log.name
                    req.session.lName = log.surname
                    res.redirect('/');
                } else {
                    res.status(201).json({
                        status:201,
                        response:"acces denied wrong password",
                        data:req.body
                    });
                }
            } else {
                res.status(404).json({
                    status:404,
                    response:'user not found'
                })
            }
        } catch (err){
            console.log(err);
        }
    }
}

module.exports = new usersController();