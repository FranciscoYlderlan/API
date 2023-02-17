import { Router } from "express"
import NotesController from "../controllers/NotesController.js";
import ensureAuthentication from "../middlewares/ensureAuthentication.js";

const notesRoutes = Router();
const notesController = new NotesController();

notesRoutes.use(ensureAuthentication)

notesRoutes.get('/', notesController.index);
notesRoutes.get('/show/:id', notesController.show);
notesRoutes.post('/', notesController.create);
notesRoutes.put('/:id', notesController.update);
notesRoutes.delete('/:id', notesController.delete);

export default notesRoutes;