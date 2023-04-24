import knex from "../database/knex/index.js"
import AppError from "../utils/AppError.js";
import dayjs from "dayjs";

export default class NotesController {
    async index(request, response){
        const {search} = request.query;
        const user_id = request.user.id;

        const Tnotes = () =>  knex('MovieNotes');
        const Ttags = () =>  knex('MovieTags');
        
        const notes = await Tnotes()
                            .join('MovieTags', 'MovieNotes.id', 'MovieTags.note_id')
                            .select("MovieNotes.id", 
                                    "title", 
                                    "description", 
                                    "rating", 
                                    "user_id", 
                                    "created_at", 
                                    "updated_at")
                            .where({user_id})
                            .where( function () {
                                this.whereLike('title', `%${search}%`)
                                this.orWhereLike('description', `%${search}%`)
                                this.orWhereLike('name', `%${search}%`)
                            }).groupBy("MovieNotes.id", 
                                    "title", 
                                    "description", 
                                    "rating", 
                                    "user_id", 
                                    "created_at", 
                                    "updated_at");


        const notesIds = notes.map(note => note.id); 
        
        const tags = await Ttags().whereIn('note_id', notesIds);

        const notesWithTags = notes.map(note => ({
            ...note,
            tags: tags.filter(tag => tag.note_id == note.id)
        }));
        
        return response.status(200).json(notesWithTags);       
    }
    async show(request, response){
        const {id} = request.params
        const user_id = request.user.id;
        const Tnotes = () =>  knex('MovieNotes');
        const Ttags = () =>  knex('MovieTags');

        let note = await Tnotes().where({id, user_id}).first();
        
        if(!note) throw new AppError("Nota não cadastrada.");
        
        const tags = await Ttags().where({note_id:note.id});
        note = {...note,
                   tags
               }
        return response.status(200).json(note);

    }
    async create(request, response){
        const user_id = request.user.id; 
        const {title, description, rating, tags} = request.body;
        
        const Ttags = () =>  knex('MovieTags');
        const Tnotes = () =>  knex('MovieNotes');
        const Tusers = () =>  knex('Users');

        const existsUser = await Tusers().where({id:user_id}).first();

        if(!existsUser) throw new AppError('Usuário não cadastrado.');
        if(!title) throw new AppError('Campo título é obrigatório.');
        if(!rating) throw new AppError('Campo nota é obrigatório.');

        const movieRegistred = await Tnotes().select('title').where({user_id,title}).first();

        if(movieRegistred) throw new AppError('Este título já foi cadastrado.');

        const now = dayjs();//.format('DD-MM-YYYY HH:mm:ss');

        const [note_id] = await Tnotes().insert({
            title,
            description,
            rating,
            user_id,
            created_at: now,
            updated_at: now
        });
        const tagsInsert = tags.map(name => {
            return {
                name,
                note_id
                
            }
        });

        await Ttags().insert(tagsInsert);

        return response.status(200).json({note_id})

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

        const now = dayjs();//.format('DD-MM-YYYY HH:mm:ss');

        await Tnotes().where({id}).update({
            title: note.title,
            description: note.description,
            rating: note.rating,
            updated_at: now
        }).catch(error => console.error(error));

        return response.status(200).json({});
    }
    async delete(request, response){
        const {id} = request.params
        const Tnotes = () =>  knex('MovieNotes');
        
        await Tnotes().where({id}).delete();
        
        return response.status(200).json({});
    }
}