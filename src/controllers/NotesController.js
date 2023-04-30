import { NoteRepository } from "../repositories/NoteRepository.js";
import { NoteServices } from "../services/NoteServices.js";

export default class NotesController {

    constructor() {
        this.noteRepository = new NoteRepository();
        this.noteServices = new NoteServices(this.noteRepository);
    }

    async index(request, response){
        const {search} = request.query;
        const user_id = request.user.id;

        const notes = await this.noteServices.index({id: user_id, search});
        
        return response.status(200).json(notes);       
    }
    async show(request, response){
        const {id} = request.params
        const user_id = request.user.id;
        
        const note = await this.noteServices.show({id, user_id});

        return response.status(200).json(note);

    }
    async create(request, response){
        const user_id = request.user.id; 
        const {title, description, rating, tags} = request.body;
        
        const note_id = this.noteServices.create({user_id, title, description, rating, tags});

        return response.status(200).json({note_id})

    }
    async update(request, response){
        const {id} = request.params; 
        const {title, description, rating} = request.body;

        await this.notesServices.update({id,title,description,rating});
        
        return response.status(200).json({});
    }
    async delete(request, response){
        const {id} = request.params
        
        await this.noteServices.delete({id});
        
        return response.status(200).json({});
    }
}