const db = require("../../db/db");
const bcrypt = require('bcrypt')

class usersDAO{
    async createChef(Firstname,Lastname,Password){
        const salt = 10
        const hash = await bcrypt.hash(Password,salt)
        const[ret] = await db('users').insert({
            name: Firstname,
            surname: Lastname,
            password:hash,
            role: 'chef',
        }).returning('id');
        return ret;
    }
    async createClient(Firstname,Lastname,Password){
        const salt = 10
        const hash = await bcrypt.hash(Password,salt)
        const[ret] = await db('users').insert({
            name: Firstname,
            surname: Lastname,
            password:hash,
            role: 'client',
        }).returning('id');
        return ret;
    }
    async updateName(id, Firstname){
        const [ret] = await db('users').where({id: id}).update({name: Firstname}).returning('id');
        return ret;
    }
    async updateLastname(id, Lastname){
        const [ret] = await db('users').where({id: id}).update({surname: Lastname}).returning('id');
        return ret;
    }
    async updateRole(id, role){
        const [ret] = await db('users').where({id: id}).update({role: role}).returning('id');
        return ret;
    }
    async updateUser(id,Firstname, Lastname, Password, role){
        const salt = 10
        const hash = await bcrypt.hash(Password,salt)
        const [ret] = await db('users').where({id: id}).update({name:Firstname,surname:Lastname,role: role,password:hash}).returning('id');
        return ret;
    }
    async login(Firstname,Lastname,Password){
        const user = await db('users').first().where({name:Firstname,surname:Lastname});
        if (user){
            const correctLog = await bcrypt.compare(Password,user.password)
            if (correctLog){
                return user;
            } else {
                return correctLog;
            }
                
        } else {
            return 404;
            }
        }
    }


module.exports = new usersDAO();