import knex from "../database/knex/index.js";
import AppError from "../utils/AppError.js";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import authConfigs from "../configs/auth.js"

export default class SessionsController {
    async create (request, response) {

        const { password, email } = request.body;

        const Tusers = () => knex('Users');
        
        const user = await Tusers().where({email}).first();
        
        if(!user) {
            throw new AppError("Email e/ou senha incorretos",401);
        }

        const matched = await compare(password,user.password);
        
        if(!matched) {
            throw new AppError("Email e/ou senha incorretos",401);
        }

        const { secret, expiresIn } = authConfigs.jwt;
        const { sign } = jwt;
        
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })
        return response.status(200).json({user,token})    
    
    }
}