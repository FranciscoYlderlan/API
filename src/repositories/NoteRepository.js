import knex from "../database/knex/index.js"

export class NoteRepository {
    
    async findById(id) {
        const Tnotes = () =>  knex('MovieNotes');

        const note = await Tnotes().where({id}).first();

        return note;
    }

    async update({id, title, description, rating, updated_at}) {

        const Tnotes = () =>  knex('MovieNotes');
        
        const note = await Tnotes().where({id}).update({
            title,
            description,
            rating,
            updated_at
        }).catch(error => console.error(error));

        return note;
    }

}