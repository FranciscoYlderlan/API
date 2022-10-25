import { Router } from "express"
import NotesController from "../controllers/NotesController.js";

const notesRoutes = Router();
const notesController = new NotesController();

notesRoutes.get('/:user_id', notesController.index);
notesRoutes.get('/show/:id', notesController.show);
notesRoutes.post('/:user_id', notesController.create);
notesRoutes.put('/:id', notesController.update);
notesRoutes.delete('/:id', notesController.delete);

export default notesRoutes;