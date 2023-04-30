
import { UsersServices } from "../services/UserServices.js";
import { UserRepository } from "../repositories/UserRepository.js";

export default class UsersController {
    
    constructor(){
        this.userRepository = new UserRepository();
        this.userServices = new UsersServices(this.userRepository);
    }
    
    async index(request, response){

        const users = await this.userServices.index();
        
        return response.status(200).json(users)
    }
    async show(request, response){
        const id = request.user.id;
        
        const user = await this.userServices.show({id});

        return response.status(200).json(user)
    }
    async create(request, response){
        const { name, email, password, avatar} = request.body;
        
        await this.userServices.create({ name, email, password, avatar});
        
        return response.status(201).json({});
    }
    async update(request, response){
        const id = request.user.id;
        
        const {password, newPassword, name, email, avatar} = request.body;

        await this.userServices.update({id, password, newPassword, name, email, avatar});
        
        return response.status(200).json({})
    }
    async delete(request, response){
        const {id} = request.params;
        
        await this.userServices.delete({id});
         
        return response.status(200).json({})
    }
}

