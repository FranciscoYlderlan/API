
import {hash, compare} from "bcrypt"
import AppError from "../utils/AppError.js";
import dayjs from "dayjs";

export class UsersServices {
    
    constructor(Repository){
        this.Repository = Repository;
    }
    
    async create({id, name, email, password, avatar}) {
        
        if(!name) throw new AppError('Campo nome é obrigatório.');
        if(!email) throw new AppError('Campo email é obrigatório.');
        if(!password) throw new AppError('Campo senha é obrigatório.');
        
        const existsEmail = await this.Repository.findByEmail(email); 
        
        if(existsEmail) throw new AppError('Email de usuário em uso.');

        const encryptPassword = await hash(password,8);

        const now = dayjs();//.format('DD-MM-YYYY HH:mm:ss');

        const id_user = await this.Repository.create({
            name,
            email,
            password: encryptPassword, 
            updated_at: now, 
            created_at: now
        });
        
        return {id: id_user};
    }

    async update({id, password, newPassword, name, email, avatar}) {
        
        const user = await this.Repository.findById(id);

        if(!user) throw new AppError('Usuário não cadastrado.');
        
        user.name = name ?? user.name;
        user.email = email ?? user.email;
        user.avatar = avatar ?? user.avatar;
    
        if(password){
            const validPassword = await compare(password, user.password);

            if(!validPassword) throw new AppError('A senha informada é inválida.');

        }else{
            
            throw new AppError('Confirme a senha.');
        
        }

        user.password = newPassword? await hash(newPassword,8) : await hash(password,8);

        
        const unavailableEmail = await this.Repository.isUnavailableEmail({id, email});
        
        
        if(unavailableEmail) throw new AppError('Email de usuário em uso.');
        
        const now = dayjs();//.format('DD-MM-YYYY HH:mm:ss');
        
        
        const userUpdated = await this.Repository.update(
        {            
            id,
            name: user.name,
            email: user.email,
            password: user.password,
            avatar: user.avatar,
            updated_at: now
        })
        
        return userUpdated;
    }

    async delete({id}) {
        
        const user = await this.Repository.delete({id});

        return user;
    }

}