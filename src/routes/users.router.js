import { Router } from "express";
import {
  getUserById,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";
import { validateUser, validateUserId } from "../middlewares/validation.js";
import { validationResult } from "express-validator";

const usersRoutes = Router();

// Middleware de validacion
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

usersRoutes.get("/", getAllUsers);
usersRoutes.get("/:id", validateUserId, handleValidation, getUserById);
usersRoutes.post("/", validateUser, handleValidation, createUser);
usersRoutes.put("/:id", [...validateUserId, ...validateUser], handleValidation, updateUser);
usersRoutes.delete("/:id", validateUserId, handleValidation, deleteUser);

export default usersRoutes;
