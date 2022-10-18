import  express  from "express";
import sqliteConnection from "./database/sqlite/index.js"; 
import routes from "./routes/index.js"


const app = express();
app.use(express.json());
app.use(routes);
sqliteConnection();

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});

