import knex from "../database/knex/index.js"
import {hash, compare} from "bcrypt"
import AppError from "../utils/AppError.js";
import dayjs from "dayjs";
import { UsersServices } from "../services/UserServices.js";
import { UserRepository } from "../repositories/UserRepository.js";

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

        return response.status(200).json(users)
    }
    async show(request, response){
        const id = request.user.id;
        
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

