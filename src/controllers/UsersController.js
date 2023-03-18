import knex from "../database/knex/index.js"
import {hash, compare} from "bcrypt"
import AppError from "../utils/AppError.js";
import dayjs from "dayjs";

export default class UsersController {
    async index(request, response){
        const Tusers = () => knex('Users');
        const Tnotes = () =>  knex('MovieNotes');
        const Ttags = () =>  knex('MovieTags');
        
        let users = await Tusers().select();
        
        users = await Promise.all(users.map(async user => {
            let notes = await Tnotes().where({user_id: user.id});
            const notesWithTags = await Promise.all(notes.map(async note => {
                const tags = await Ttags().where({note_id: note.id});
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

        response.status(200).json(users)
    }
    async show(request, response){
        const {id} = request.params;
        
        const Tusers = () => knex('Users');
        const Tnotes = () =>  knex('MovieNotes');
        const Ttags = () =>  knex('MovieTags');

        let user = await Tusers().where({id}).first();

        const notes = await Tnotes().where({user_id: id});
        
        const notesIds = notes.map(note => note.id); 
        
        const tags = await Ttags().whereIn('note_id', notesIds);

        const notesWithTags = notes.map(note => ({
            ...note,
            tags: tags.filter(tag => tag.note_id == note.id)
        }));

        user = {
            ...user,
            notes: notesWithTags
        }


        response.status(200).json(user)
    }
    async create(request, response){
        const {id, name, email, password, avatar} = request.body;
        const Tusers = () => knex('Users');
        
        if(!name) throw new AppError('Campo nome é obrigatório.');
        if(!email) throw new AppError('Campo email é obrigatório.');
        if(!password) throw new AppError('Campo senha é obrigatório.');

        const existsEmail = await Tusers().where({ email }).first();
        if(existsEmail) throw new AppError('Email de usuário em uso.');

        const encryptPassword = await hash(password,8);

        const now = dayjs().format('DD-MM-YYYY HH:mm:ss');

        await Tusers().insert({
            name,
            email,
            password: encryptPassword,
            avatar,
            created_at:now,
            updated_at:now
 
        }).catch(error => console.error(error))

        response.status(201).json({});
    }
    async update(request, response){
        const id = request.user.id;
        
        const {password, newPassword, name, email, avatar} = request.body;

        const Tusers = () => knex("Users");

        const user = await Tusers().where({id}).first();

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

        const unavailableEmail = await Tusers().whereNot({id}).where({email: user.email}).first();
        
        if(unavailableEmail) throw new AppError('Email de usuário em uso.');
        
        const now = dayjs().format('DD-MM-YYYY HH:mm:ss');

        await Tusers().where({id}).update({
            name: user.name,
            email: user.email,
            password: user.password,
            avatar: user.avatar,
            updated_at: now
        }).catch(error => console.error(error))


        response.status(200).json({})
    }
    async delete(request, response){
        const {id} = request.params;
        const Tusers = () => knex("Users"); 
        
        await Tusers().where({id}).delete();
     
        response.status(200).json({})
    }
}

