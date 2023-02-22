import { Router } from "express"
import UsersController from "../controllers/UsersController.js";
import AvatarUserController from "../controllers/AvatarUserController.js";
import ensureAuthentication from "../middlewares/ensureAuthentication.js";

import multer from "multer";

import uploadConfigs from "../configs/uploads.js";

const usersRoutes = Router();
const usersController = new UsersController();

const upload = multer(uploadConfigs.MULTER);

const avatarUserController = new AvatarUserController();

// usersRoutes.get("/", usersController.index);
// usersRoutes.get("/:id", usersController.show);
usersRoutes.post("/", usersController.create);
usersRoutes.put("/",ensureAuthentication,usersController.update);
usersRoutes.patch("/avatar",ensureAuthentication, upload.single("avatar"), avatarUserController.update);
// usersRoutes.delete("/:id", usersController.delete);

export default usersRoutes;