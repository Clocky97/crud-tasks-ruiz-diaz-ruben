import { Router } from "express";
import { createRole, getAllRoles } from "../controllers/roles.controller.js";

const rolesRoutes = Router();


rolesRoutes.get("/", getAllRoles);
rolesRoutes.post("/", createRole);

export default rolesRoutes;
