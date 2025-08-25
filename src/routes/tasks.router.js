import { Router } from "express";
import {
  getTaskById,
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controller.js";
import { validateTask, validateTaskId } from "../middlewares/validation.js";
import { validationResult } from "express-validator";

const tasksRoutes = Router();

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

tasksRoutes.get("/", getAllTasks);
tasksRoutes.get("/:id", validateTaskId, handleValidation, getTaskById);
tasksRoutes.post("/", validateTask, handleValidation, createTask);
tasksRoutes.put("/:id", [...validateTaskId, ...validateTask], handleValidation, updateTask);
tasksRoutes.delete("/:id", validateTaskId, handleValidation, deleteTask);

export default tasksRoutes;
