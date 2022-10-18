import { Router } from "express"
import UsersController from "../controllers/UsersController.js";

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.post("/create",  usersController.create);

export default usersRoutes;