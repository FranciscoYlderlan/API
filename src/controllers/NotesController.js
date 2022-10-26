import knex from "../database/knex/index.js"
import AppError from "../utils/AppError.js";


export default class NotesController {
    async index(request, response){
        const {user_id} = request.params;
        const Tnotes = () =>  knex('MovieNotes');
        const notes = await Tnotes().where({user_id});
        
        response.status(200).json(notes);       
    }
    async show(request, response){
        const {id} = request.params
        const Tnotes = () =>  knex('MovieNotes');
        const Ttags = () =>  knex('MovieTags');

        let note = await Tnotes().where({id}).first();
        
        if(!note) throw new AppError("Nota não cadastrada.");
        
        const tags = await Ttags().where({note_id:note.id});
        note = {...note,
                   tags
               }
        response.status(200).json(note);

    }
    async create(request, response){
        const {user_id} = request.params; 
        const {id, title, description, rating} = request.body;
        
        const Tnotes = () =>  knex('MovieNotes');
        const Tusers = () =>  knex('Users');

        const existsUser = await Tusers().where({id:user_id}).first();

        if(!existsUser) throw new AppError('Usuário não cadastrado.');
        if(!title) throw new AppError('Campo título é obrigatório.');
        if(!rating) throw new AppError('Campo nota é obrigatório.');

        const movieRegistred = await Tnotes().select('title').where({user_id,title}).first();

        if(movieRegistred) throw new AppError('Este título já foi cadastrado.');

        await Tnotes().insert({
            title,
            description,
            rating,
            user_id,
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
        });
        response.status(200).json({})

    }
    async update(request, response){
        const {id} = request.params; 
        const {title, description, rating} = request.body;
        const Tnotes = () =>  knex('MovieNotes');

        const note = await Tnotes().where({id}).first();
        if(!note) throw new AppError('Nota não cadastrada.');

        note.title = title ?? note.title;
        note.description = description ?? note.description;
        note.rating = rating ?? note.rating;

        await Tnotes().where({id}).update({
            title: note.title,
            description: note.description,
            rating: note.rating,
            updated_at: knex.fn.now()
        }).catch(error => console.error(error));

        response.status(200).json({});
    }
    async delete(request, response){
        const {id} = request.params
        const Tnotes = () =>  knex('MovieNotes');
        
        await Tnotes().where({id}).delete();
        
        response.status(200).json({});
    }
}