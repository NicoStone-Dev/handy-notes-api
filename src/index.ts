import "dotenv/config";
import express, { Application } from "express";
import UserRouter from "./routes/UserRoutes.js";
import { testRouter } from "./routes/TestRoutes.js";

const app: Application = express();
// Defining used port
const PORT = 6060;

// Defining what's to be used to parse the json bodies
app.use(express.json());

// Defining the base url for each route
//app.use('/app/task/', TaskRouter); not to be used yet
//app.use('/api/user/', UserRouter);

app.use('/api/test/', testRouter)

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
})