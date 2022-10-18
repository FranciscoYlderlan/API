import  express  from "express";

import routes from "./routes/index.js"

const app = express();

app.use(express.json());

app.use(routes);

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});

