const usersDAO = require('../dao/usersDAO');

class usersService{
    createChef(usersDto){
        const { Firstname, Lastname, Password } = usersDto;
        return usersDAO.createChef(Firstname,Lastname,Password);
    }
    createClient(usersDto){
        const { Firstname, Lastname,Password } = usersDto;
        return usersDAO.createClient(Firstname,Lastname,Password);
    }
    updateName(usersDto){
        const {id,Firstname} = usersDto;
        return usersDAO.updateName(id,Firstname);
    }
    updateLastname(usersDto){
        const {id,Lastname} = usersDto;
        return usersDAO.updateLastname(id,Lastname);
    }
    updateRole(usersDto){
        const {id,role} = usersDto;
        return usersDAO.updateRole(id,role);
    }
    updateUser(usersDto){
        const {id,Firstname, Lastname, Password,role} = usersDto;
        return usersDAO.updateUser(id,Firstname, Lastname, Password,role);
    }
    login(userDto){
        const {Firstname,Lastname,Password} = userDto;
        return usersDAO.login(Firstname,Lastname,Password);
    }
}

module.exports = new usersService();