import AppError from "./utils/AppError.js";

import 'express-async-errors';
import 'dotenv/config.js';

import express  from "express";
import cors from 'cors';

import routes from "./routes/index.js";

import sqliteConnection from "./database/sqlite/index.js"; 
import uploadConfigs from "./configs/uploads.js";


const app = express();

app.use(cors());

app.use(express.json());

app.use('/files', express.static(uploadConfigs.UPLOADS_FOLDER));

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

const PORT = process.env.SERVER_PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});

