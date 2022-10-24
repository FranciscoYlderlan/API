import knex from "../database/knex/index.js"
import {hash, compare} from "bcrypt"
import AppError from "../utils/AppError.js";


export default class UsersController {

    async index(request, response) {
        const {id, name, email, password, avatar} = request.body;
        
     
        response.status(200).json({})
    }

    async show(request, response) {
        const {id, name, email, password, avatar} = request.body;
        
     
        response.status(200).json({})
    }
    async create(request, response) {
        const {id, name, email, password, avatar} = request.body;
        const users = () => knex('Users');

        const existsName = await users().where({ name }).first();
        if(existsName) throw new AppError("Nome de usuário em uso.");
        
        const existsEmail = await users().where({ email }).first();
        if(existsEmail) throw new AppError("Email de usuário em uso.");

        const encryptPassword = await hash(password,8);

        await users().insert({
            name,
            email,
            password: encryptPassword,
            avatar,
            updated_at: knex.fn.now(),
            created_at: knex.fn.now()
        }).catch(error => console.error(error))

        response.status(201).json({})
    }
    async update(request, response) {
        const {id, name, email, password, avatar} = request.body;
        
     
        response.status(200).json({})
    }

    async delete(request, response) {
        const {id, name, email, password, avatar} = request.body;
        
     
        response.status(200).json({})
    }
}

