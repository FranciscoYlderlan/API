import  express  from "express";
import 'express-async-errors';
import sqliteConnection from "./database/sqlite/index.js"; 
import routes from "./routes/index.js";
import AppError from "./utils/AppError.js";

const app = express();
app.use(express.json());
app.use(routes);
sqliteConnection();

app.use((error,request,response,next) => {
    if (error instanceof AppError) 
        return response.status(error.statusCode)
                       .json(error.message());

    console.error(error)
    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    })
})

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});

