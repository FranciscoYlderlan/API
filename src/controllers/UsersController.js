
export default class UsersController {

    create(request, response) {
        const {id, name, email, password, avatar} = request.body;
    
        response.status(201).json({id})
    }
}

