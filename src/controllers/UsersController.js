
import { UsersServices } from "../services/UserServices.js";
import { UserRepository } from "../repositories/UserRepository.js";

export default class UsersController {
    
    async index(request, response){

        const userRepository = new UserRepository();
        const userServices = new UsersServices(userRepository);

        const users = await userServices.index();
        
        return response.status(200).json(users)
    }
    async show(request, response){
        const id = request.user.id;

        const userRepository = new UserRepository();
        const userServices = new UsersServices(userRepository);
        
        const user = await userServices.show({id});

        return response.status(200).json(user)
    }
    async create(request, response){
        const { name, email, password, avatar} = request.body;

        const userRepository = new UserRepository();
        const userServices = new UsersServices(userRepository);
        
        await userServices.create({ name, email, password, avatar});
        
        return response.status(201).json({});
    }
    async update(request, response){
        const id = request.user.id;
        
        const {password, newPassword, name, email, avatar} = request.body;

        const userRepository = new UserRepository();
        const userServices = new UsersServices(userRepository);

        await userServices.update({id, password, newPassword, name, email, avatar});
        
        return response.status(200).json({})
    }
    async delete(request, response){
        const {id} = request.params;
        
        const userRepository = new UserRepository();
        const userServices = new UsersServices(userRepository);
        
        await userServices.delete({id});
         
        return response.status(200).json({})
    }
}

