import knex from "../database/knex/index.js"

export class NoteRepository {
    
    async findById(id) {
        const Tnotes = () =>  knex('MovieNotes');

        const note = await Tnotes().where({id}).first();

        return note;
    }

    async findByUserAndId({user_id, id}){
        const Tnotes = () =>  knex('MovieNotes');

        const note = await Tnotes().where({id, user_id}).first();

        return note;
    }

    async findTagsByNote(id){
        const Ttags = () =>  knex('MovieTags');

        const tags = await Ttags().where({note_id: id});

        return tags;
    }

    async findTagsByNotes(ids){
        const Ttags = () =>  knex('MovieTags');

        const tags = await Ttags().whereIn('note_id', ids);

        return tags;
    }
    
    async existingUser(id) {
       const Tusers = () =>  knex('Users');
       const user = await Tusers().where({id}).first();
       
       return user;
    }

    async noteAlreadyRegistered({user_id,title}) {
        const Tnotes = () =>  knex('MovieNotes');
    
        const note = await Tnotes().select('title').where({user_id,title}).first();
        
        return note;
    }

    async findByUserAndKeyword({user_id, keyword}) {
        const Tnotes = () =>  knex('MovieNotes');

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
            this.whereLike('title', `%${keyword}%`)
            this.orWhereLike('description', `%${keyword}%`)
            this.orWhereLike('name', `%${keyword}%`)
        }).groupBy("MovieNotes.id", 
                "title", 
                "description", 
                "rating", 
                "user_id", 
                "created_at", 
                "updated_at");

        return notes;

    }

    async insertTags(tags){
        const Ttags = () =>  knex('MovieTags');
        
        const insertedTags  = await Ttags().insert(tags);
        
        return insertedTags;
    }

    async insert( {title, description, rating, user_id, created_at, updated_at}) {
        
        const Tnotes = () =>  knex('MovieNotes');

        const note = await Tnotes().insert({
            title,
            description,
            rating,
            user_id,
            created_at,
            updated_at
        });

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

    async delete({id}) {
        const Tnotes = () =>  knex('MovieNotes');
        
        const note = await Tnotes().where({id}).delete();
        
        return note;
    }

}