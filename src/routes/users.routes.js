import { Router } from "express"
import UsersController from "../controllers/UsersController.js";

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.get("/", usersController.index);
usersRoutes.post("/create", usersController.create);
usersRoutes.put("/:id", usersController.update);

export default usersRoutes;