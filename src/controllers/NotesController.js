import { NoteRepository } from "../repositories/NoteRepository.js";
import { NoteServices } from "../services/NoteServices.js";

export default class NotesController {

    async index(request, response){
        const {search} = request.query;
        const user_id = request.user.id;

        const noteRepository = new NoteRepository();
        const noteServices = new NoteServices(noteRepository);

        const notes = await noteServices.index({id: user_id, search});
        
        return response.status(200).json(notes);       
    }
    async show(request, response){
        const {id} = request.params
        const user_id = request.user.id;
        
        const noteRepository = new NoteRepository();
        const noteServices = new NoteServices(noteRepository);
        
        const note = await noteServices.show({id, user_id});

        return response.status(200).json(note);

    }
    async create(request, response){
        const user_id = request.user.id; 
        const {title, description, rating, tags} = request.body;
        
        const noteRepository = new NoteRepository();
        const noteServices = new NoteServices(noteRepository);

        const note_id = noteServices.create({user_id, title, description, rating, tags});

        return response.status(200).json({note_id})

    }
    async update(request, response){
        const {id} = request.params; 
        const {title, description, rating} = request.body;

        const noteRepository = new NoteRepository();
        const noteServices = new NoteServices(noteRepository);

        await noteServices.update({id,title,description,rating});
        
        return response.status(200).json({});
    }
    async delete(request, response){
        const {id} = request.params

        const noteRepository = new NoteRepository();
        const noteServices = new NoteServices(noteRepository);

        
        await noteServices.delete({id});
        
        return response.status(200).json({});
    }
}