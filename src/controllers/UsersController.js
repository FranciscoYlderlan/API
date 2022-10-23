import knex from "../database/knex/index.js"
import {hash, compare} from "bcrypt"

export default class UsersController {

    async create(request, response) {
        const {id, name, email, password, avatar} = request.body;
        
        const encrypted_password = await hash(password,8);
        
        const id_user = await knex('users').insert({
            name,
            email,
            password: encrypted_password,
            avatar,
            updated_at: knex.fn.now(),
            created_at: knex.fn.now()
        }).catch(error => console.error(error))

        response.status(201).json({})
    }
}

