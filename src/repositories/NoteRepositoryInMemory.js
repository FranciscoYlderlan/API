
export class NoteRepositoryInMemory {
    Users = [];

    async findById(id) {


        return note;
    }

    async findByUserAndId(user_id, id){

        return note;
    }

    async findTagsByNote(id){

        return tags;
    }

    async findTagsByNotes(ids){

        return tags;
    }
    
    async existingUser(id) {
       
       return user;
    }

    async noteAlreadyRegistered({user_id,title}) {
        
        return note;
    }

    async findByUserAndKeyword({user_id, keyword}) {

        return notes;

    }

    async insertTags(tags){
        
        return insertedTags;
    }

    async insert( {title, description, rating, user_id, created_at, updated_at}) {
        
        return note;
    }

    async update({id, title, description, rating, updated_at}) {

        return note;
    }

    async delete({id}) {
        
        return note;
    }

}