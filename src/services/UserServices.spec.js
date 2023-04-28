import { UserRepositoryInMemory } from "../repositories/UserRepositoryInMemory";
import { UsersServices } from "./UserServices";


describe("UserCreateService",() => {

    it("Should be create user", async () => {

        const user = {
            name: 'João',
            email:"joao@email.com",
            password:"joaozinholegal",
            avatar:null
        }

        const userRepositoryInMemory = new UserRepositoryInMemory();
        const userServices = new UsersServices(userRepositoryInMemory);
        
        const result = await userServices.create(user);
        
        expect(result).not.toBeNull();
    })

});