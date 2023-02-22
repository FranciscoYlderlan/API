import { Router } from "express"
import UsersController from "../controllers/UsersController.js";
import AvatarUserController from "../controllers/AvatarUserController.js";
import ensureAuthentication from "../middlewares/ensureAuthentication.js";
import multer from "multer";
const usersRoutes = Router();
const usersController = new UsersController();

const avatarUserController = new AvatarUserController();

// usersRoutes.get("/", usersController.index);
// usersRoutes.get("/:id", usersController.show);
usersRoutes.post("/", usersController.create);
usersRoutes.put("/",ensureAuthentication,usersController.update);
usersRoutes.put("/avatar",ensureAuthentication,uploads.single("avatar"),avatarUsersController.update);
// usersRoutes.delete("/:id", usersController.delete);

export default usersRoutes;