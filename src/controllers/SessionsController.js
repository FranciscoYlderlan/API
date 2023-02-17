import knex from "../database/knex/index.js";
import AppError from "../utils/AppError";
import { compare } from "bcrypt";

export default class SessionsController {
    async create (request, response) {
        const { password, email } = request.params;

        const Tusers = () => knex('Users');
        
        const user = await Tusers().where({email}).first();
        
        if(!user) {
            throw new AppError("Email e/ou senha incorretos",401);
        }

        const matched = await compare(password,user.password);
        
        if(!matched) {
            throw new AppError("Email e/ou senha incorretos",401);
        }

        response.status(200).json(user)

    }
}