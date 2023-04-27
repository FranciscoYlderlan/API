
import {hash, compare} from "bcrypt"
import AppError from "../utils/AppError.js";
import dayjs from "dayjs";

export class NoteServices {
    
    constructor(Repository){
        this.Repository = Repository;
    }

    async update({id, title, description, rating}) {
        
        const note = await this.Repository.findById(id);
        
        if(!note) throw new AppError('Nota não cadastrada.');

        note.title = title ?? note.title;
        note.description = description ?? note.description;
        note.rating = rating ?? note.rating;

        const now = dayjs();//.format('DD-MM-YYYY HH:mm:ss');

        const noteUpdated = await this.Repository.update({
            id,
            title: note.title,
            description: note.description,
            rating: note.rating,
            updated_at: now
        });
        

        return noteUpdated;
    }
}