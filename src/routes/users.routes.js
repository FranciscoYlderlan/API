import { Router } from "express"
import UsersController from "../controllers/UsersController.js";

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.get("/:id", (request, response) => {
    const {id} = request.params;
    response.send(`Usuário cadastrado de id ${id}`);
});


usersRoutes.post("/create",  usersController.create);

export default usersRoutes;