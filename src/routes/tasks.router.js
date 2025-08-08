import { Router } from "express";
import {
    getTasks,
    getAllTasks,
    createTasks,
    updateTasks,
    deleteTasks
} from "../controllers/tasks.controller.js";

const tasksRoutes = Router();

tasksRoutes.get("/tasks/:id", getTasks);
tasksRoutes.put("/tasks/:id", updateTasks);
tasksRoutes.post("/tasks", createTasks);
tasksRoutes.get("/tasks", getAllTasks);
tasksRoutes.delete("/tasks", deleteTasks);

export default tasksRoutes;