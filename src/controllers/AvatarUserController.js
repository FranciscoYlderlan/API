import knex from "../database/knex/index.js";
import AppError from "../utils/AppError.js";
import { DiskStorage } from "../providers/DiskStorage.js";

export default class AvatarUserController {
    async update(request, response) {
        const id = request.user.id;
        const filename = request.file.filename;

        const Tusers = () => knex("Users");
        const user = await Tusers().where({id}).first();
        
        const diskStorage = new DiskStorage();
        
        if(!user) throw new AppError('Usuário não autenticado.',401);

        if(user.avatar) await diskStorage.deleteFile(user.avatar);

        await diskStorage.saveFile(filename);

        user.avatar = filename;
        
        await Tusers().where({id}).update(user).catch(error => console.error(error));

        response.status(200).json({user})
    }
}