
import AppError from "../utils/AppError.js";
import dayjs from "dayjs";

export class NoteServices {
    
    constructor(repository){
        this.repository = repository;
    }

    async index({id, search}) {

        const notes = await this.repository.findByUserAndKeyword(id,search);

        const notesIds = notes.map(note => note.id); 
        
        const tags = await this.repository.findTagsByNotes(notesIds);

        const notesWithTags = notes.map(note => ({
            ...note,
            tags: tags.filter(tag => tag.note_id == note.id)
        }));

        return notesWithTags
    }

    async show({id, user_id}){

        let note = await this.repository.findByUserAndId(id, user_id);
        
        if(!note) throw new AppError("Nota não cadastrada.");
        
        const tags = await this.repository.findTagsByNote(note.id);
        note = {...note,
                   tags
               }
        return note;
    }

    async create({user_id, title, description, rating, tags}){

        const existsUser = await this.repository.existingUser(user_id);

        if(!existsUser) throw new AppError('Usuário não cadastrado.');
        if(!title) throw new AppError('Campo título é obrigatório.');
        if(!rating) throw new AppError('Campo nota é obrigatório.');

        const noteRegistred = await this.repository.noteAlreadyRegistered({user_id,title});

        if(noteRegistred) throw new AppError('Este título já foi cadastrado.');

        const now = dayjs();//.format('DD-MM-YYYY HH:mm:ss');

        const [note_id] = await this.repository.insert(
            { 
                title,
                description,
                rating,
                user_id,
                created_at: now,
                updated_at: now
            }
        );
        
        const tagsInsert = tags.map(name => {
            return {
                name,
                note_id
            }
        });

        await this.repository.insertTags(tagsInsert);

        return note_id;

    }

    async update({id, title, description, rating}) {
        
        const note = await this.repository.findById(id);
        
        if(!note) throw new AppError('Nota não cadastrada.');

        note.title = title ?? note.title;
        note.description = description ?? note.description;
        note.rating = rating ?? note.rating;

        const now = dayjs();//.format('DD-MM-YYYY HH:mm:ss');

        const noteUpdated = await this.repository.update({
            id,
            title: note.title,
            description: note.description,
            rating: note.rating,
            updated_at: now
        });
        

        return noteUpdated;
    }

    async delete({id}) {
        
        const note = await this.repository.delete({id});
        
        return note;
    }
}