import knex from "../database/knex/index.js"

export default class UsersController {

    async create(request, response) {
        const {id, name, email, password, avatar} = request.body;
        const id_notes = await knex('users').insert({
            name,
            email,
            password,
            avatar,
            updated_at: knex.fn.now(),
            created_at: knex.fn.now()
        })
        response.status(201).json({})
    }
}

