import { Router } from "express"
import UsersController from "../controllers/UsersController.js";
import ensureAuthentication from "../middlewares/ensureAuthentication.js";

const usersRoutes = Router();
const usersController = new UsersController();

// usersRoutes.get("/", usersController.index);
// usersRoutes.get("/:id", usersController.show);
usersRoutes.post("/", usersController.create);
usersRoutes.put("/",ensureAuthentication,usersController.update);
// usersRoutes.delete("/:id", usersController.delete);

export default usersRoutes;