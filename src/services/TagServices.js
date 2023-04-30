
import {hash, compare} from "bcrypt"
import AppError from "../utils/AppError.js";
import dayjs from "dayjs";

export class UsersServices {
    
    constructor(repository){
        this.repository = repository;
    }
    
    async index(){

        let users = await this.repository.findAllUsers();
        
        users = await Promise.all(users.map(async user => {
            let notes = await this.repository.findNotesByUser(user.id);
            const notesWithTags = await Promise.all(notes.map(async note => {
                const tags = await this.repository.findTagsByNote(note.id);
                return {
                    ...note,
                    tags
                };
            }));
            return {
                ...user,
                notes: notesWithTags
            };
        }));

        return users;
    }

    async show({id}){
 
        let user = await this.repository.findById(id);
       
        const notes = await this.repository.findNotesByUser(id);
        
        const notesIds = notes.map(note => note.id); 
        
        const tags = await this.repository.findTagsByNotes(notesIds);

        const notesWithTags = notes.map(note => ({
            ...note,
            tags: tags.filter(tag => tag.note_id == note.id)
        }));

        user = {
            ...user,
            notes: notesWithTags
        }

        return user;
    }

    async create({ name, email, password, avatar}) {
        
        if(!name) throw new AppError('Campo nome é obrigatório.');
        if(!email) throw new AppError('Campo email é obrigatório.');
        if(!password) throw new AppError('Campo senha é obrigatório.');
        
        const existsEmail = await this.repository.findByEmail(email); 
        
        if(existsEmail) throw new AppError('Email de usuário em uso.');

        const encryptPassword = await hash(password,8);

        const now = dayjs();//.format('DD-MM-YYYY HH:mm:ss');

        const [id] = await this.repository.create({
            name,
            email,
            password: encryptPassword, 
            updated_at: now, 
            created_at: now
        });
        
        return {id};
    }

    async update({id, password, newPassword, name, email, avatar}) {
        
        const user = await this.repository.findById(id);

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

        
        const unavailableEmail = await this.repository.isUnavailableEmail({id, email});
        
        
        if(unavailableEmail) throw new AppError('Email de usuário em uso.');
        
        const now = dayjs();//.format('DD-MM-YYYY HH:mm:ss');
        
        
        const userUpdated = await this.repository.update(
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
        
        const user = await this.repository.delete({id});

        return user;
    }

}