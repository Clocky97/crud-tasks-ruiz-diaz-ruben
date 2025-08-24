import { Router } from "express";
import {
  getTaskById,
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controller.js";

const tasksRoutes = Router();

tasksRoutes.get("/", getAllTasks);
tasksRoutes.get("/:id", getTaskById);
tasksRoutes.post("/", createTask);
tasksRoutes.put("/:id", updateTask);
tasksRoutes.delete("/:id", deleteTask);

export default tasksRoutes;
