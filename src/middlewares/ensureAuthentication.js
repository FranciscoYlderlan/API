import jwt from "jsonwebtoken";
import authConfigs from "../configs/auth.js";

export default function ensureAuthentication(request, response, next) {
    const authHeader = request.headers.authorization;
    
    if(!authHeader) throw new AppError("JWT Token não informado", 401);
    
    const [,token] = authHeader.split(" ");
    
    const { verify } = jwt;

    try {
        
        const { secret } = authConfigs.jwt;
        const { sub : user_id } = verify(token,secret);

        request.user = {
            id: Number(user_id)
        }
       
       return next();
    } catch (error) {
        throw new AppError("JWT Token inválido", 401);
    }

}