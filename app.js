import express from "express";
import dotenv from "dotenv";
import tasksRoutes from "./src/routes/tasks.router.js";
import usersRoutes from "./src/routes/users.router.js";
import { startDB } from "./src/config/database.js";
import { Users, Tasks } from "./src/models/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1212;

app.use(express.json());

 app.use(express.json());

 app.use("/api/tasks", tasksRoutes);

 app.use("/api/users", usersRoutes);

startDB();

app.listen(PORT, ()=>{
    console.log("Servidor en funcionamiento.")
});