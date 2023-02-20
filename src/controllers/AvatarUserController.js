import knex from "../database/knex/index.js";
import AppError from "../utils/AppError.js";
import { DiskStorage } from "../providers/DiskStorage.js";


const diskStorage = new DiskStorage();

export default class AvatarUserController {
    async update(request, response) {
        const id = request.user.id;
        
        const Tusers = () => knex("Users");
        const user = await Tusers().where({id}).first();
        
        if(!user) throw new AppError('Usuário não cadastrado.');

        if(user.avatar) await diskStorage.deleteFile(user.avatar);

        await diskStorage.saveFile(user.avatar);
        
        await Tusers().where({id}).update({
            avatar: user.avatar
        }).catch(error => console.error(error));

        response.status(200).json({})
    }
}