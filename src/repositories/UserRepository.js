import knex from "../database/knex/index.js"

export class UserRepository {
    

    async findById(id) {
        const Tusers = () => knex('Users');

        const user = await Tusers().where({ id }).first();

        return user;
    }

    async findAllUsers() {
        const Tusers = () => knex('Users');

        let users = await Tusers().select();

        return users;
    }

    async findByEmail(email) {
        const Tusers = () => knex('Users');

        const existsEmail = await Tusers().where({ email }).first();

        return existsEmail;
    }

    async findTagsByNotes(ids){
        const Ttags = () =>  knex('MovieTags');

        const tags = await Ttags().whereIn('note_id', ids);

        return tags;
    }
    
    async findTagsByNote(id){
        const Ttags = () =>  knex('MovieTags');

        const tags = await Ttags().where({note_id: id});

        return tags;
    }

    async findNotesByUser(id){
        const Tnotes = () =>  knex('MovieNotes');

        const notes = await Tnotes().where({user_id: id});
        
        return notes;
    }

    async isUnavailableEmail({id, email}) {
        const Tusers = () => knex('Users');

        const unavailableEmail = await Tusers().whereNot({id}).where({email}).first();
        
        return unavailableEmail;
    }
    
    async create({name, email, password, avatar, created_at, updated_at }) {
        const Tusers = () => knex('Users');
        const user = await Tusers().insert({
            name,
            email,
            password,
            avatar,
            created_at,
            updated_at
 
        }).catch(error => console.error(error))

        return user;
    }

    async update({id, name, email, password, avatar, created_at, updated_at }) {
        const Tusers = () => knex('Users');
        const user = await Tusers().where({id}).update({
            name,
            email,
            password,
            avatar,
            created_at,
            updated_at
 
        }).catch(error => console.error(error))

        return user;
    }

    async delete({id}) {
        const Tusers = () => knex("Users"); 
        
        const user = await Tusers().where({id}).delete();
        
        return user;
    }

}