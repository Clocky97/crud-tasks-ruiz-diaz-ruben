import { Router } from "express";
import {
  getUserById,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";

const usersRoutes = Router();

usersRoutes.get("/", getAllUsers);
usersRoutes.get("/:id", getUserById);
usersRoutes.post("/", createUser);
usersRoutes.put("/:id", updateUser);
usersRoutes.delete("/:id", deleteUser);

export default usersRoutes;
