import Router from 'express'
import TagsController from '../controllers/TagsController.js'
import ensureAuthentication from '../middlewares/ensureAuthentication.js';

const tagsRoutes = Router();
const tagsController = new TagsController();

tagsRoutes.use(ensureAuthentication);

tagsRoutes.get('/:note_id',tagsController.index);
tagsRoutes.get('/show/:id',tagsController.show);
tagsRoutes.post('/:note_id',tagsController.create);
tagsRoutes.put('/:id',tagsController.update);
tagsRoutes.delete('/:id',tagsController.delete);

export default tagsRoutes;