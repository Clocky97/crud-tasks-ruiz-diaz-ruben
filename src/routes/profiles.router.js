import { Router } from "express";
import { createProfile, getAllProfiles } from "../controllers/profiles.controller.js";

const profilesRoutes = Router();

profilesRoutes.get("/", getAllProfiles);
profilesRoutes.post("/", createProfile);

export default profilesRoutes;
