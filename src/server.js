import  express  from "express";

const app = express();

app.use(express.json());

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});

app.get("/users/:id", (request, response) => {
    const {id} = request.params;
    response.send(`Usuário cadastrado de id ${id}`);
});

app.get("/filme", (request, response) => {
    const {titulo, ator} = request.query;
    response.send(`O filme escolhido foi ${titulo} estrelado por ${ator}`);
});


app.post("/users/create", (request, response) => {
    
    response.send(request.body);
});