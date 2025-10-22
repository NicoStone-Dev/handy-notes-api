import express, { Application } from "express";
import dotenv from 'dotenv';
import UserRouter from "./routes/UserRoutes.js";

dotenv.config();

const app: Application = express();
// Defining used port
const PORT = 6060;

// Defining what's to be used to parse the json bodies
app.use(express.json());

// Defining the base url for each route
//app.use('/app/task/', TaskRouter); not to be used yet
app.use('/api/users/', UserRouter);

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
})