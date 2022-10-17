import { Router } from "express"

const usersRoutes = Router();

usersRoutes.get("/:id", (request, response) => {
    const {id} = request.params;
    response.send(`Usuário cadastrado de id ${id}`);
});


usersRoutes.post("/create", (request, response) => {
    const {id, name, email, password, avatar} = request.body;
    
    response.send({id, name, email, password, avatar});
});

export {usersRoutes} ;