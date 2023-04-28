
export class UserRepositoryInMemory {
    Users = [];

    async findById(id) {


        return user;
    }

    async findByEmail(email) {

        const [user] = this.Users.filter(user => user.email = email);

        return user;
    }

    async isUnavailableEmail({id, email}) {
        
        return unavailableEmail;
    }
    
    async create({name, email, password, avatar, created_at, updated_at }) {

        const id =  Math.random() * (9999999 - 0);
        
        this.Users.push({
            id,
            name,
            email,
            password,
            avatar,
            created_at,
            updated_at
        })
        
        const user = this.Users.filter(user => user.id = id);

        return user;
    }

    async update({id, name, email, password, avatar, created_at, updated_at }) {

        return user;
    }

    async delete({id}) {
        
        return user;
    }

}