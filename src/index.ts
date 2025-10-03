import express, { Application } from "express";
import dotenv from 'dotenv';
import TaskRouter from "./routes/TaskRoutes.js";

dotenv.config();

const app: Application = express();
// Defining used port
const PORT = 6060;

// Defining what's to be used to parse the json bodies
app.use(express.json());

// Defining base URL
app.get('/app', (req, res) => {
    res.send("Welcome to this shit show!")
})

// Defining the base url for TaskRoutes
app.use('/app/tasks', TaskRouter);

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
})