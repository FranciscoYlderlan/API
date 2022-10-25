import knex from "../database/knex/index.js"
import AppError from "../utils/AppError.js";

export default class TagsController {
    async index(request, response){
        const {note_id} = request.params;
        const Ttags = () => knex('MovieTags');

        const tags = await Ttags().where({note_id});

        response.status(200).json(tags);    
    }
    async show(request, response){
        const {id} = request.params;
        const Ttags = () => knex('MovieTags');

        const tag = await Ttags().where({id}).first();

        response.status(200).json(tag);
    }
    async create(request, response){
        const {note_id} = request.params;
        const {name} = request.body;

        const Ttags = () => knex('MovieTags');
        const Tnotes = () => knex('MovieNotes');
       
        const existsNote = await Tnotes().where({id: note_id}).first();

        if(!existsNote) throw new AppError('Nota não cadastrada.'); 
        
        if(!name) throw new AppError('Campo nome é obrigatório.');

        await Ttags().insert({
            name,
            note_id,
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
        });

        response.status(200).json({});

    }
    async update(request, response){
        const {id} = request.params;
        const {name} = request.body;

        const Ttags = () => knex('MovieTags');
        
        const tag = await Ttags().where({id}).first();

        if(!tag) throw new AppError('Tag não cadastrada.');

        tag.name = name?? tag.name;
        
        await Ttags().where({id}).update({
            name: tag.name,
            updated_at: knex.fn.now()
        });
        response.status(200).json({});

    }
    async delete(request, response){
        const {id} = request.params;
        const Ttags = () => knex('MovieTags');

        await Ttags().where({id}).delete();
        
        response.status(200).json({});
    }
}