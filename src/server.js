import AppError from "./utils/AppError.js";
import express  from "express";
import 'express-async-errors';
import routes from "./routes/index.js";
import sqliteConnection from "./database/sqlite/index.js"; 

const app = express();
app.use(express.json());
app.use(routes);

sqliteConnection();

app.use((error,request,response,next) => {
    const clientError = error instanceof AppError;
    
    if (clientError){ 
        return response.status(error.statusCode).json(error.Message());
    }
    console.error(error);
    return response.status(500).json(AppError.ServerErrorMessage());
})

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});

