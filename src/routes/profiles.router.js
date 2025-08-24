import { Router } from "express";
import {
  getProfileById,
  getAllProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/profiles.controller.js";

const profilesRoutes = Router();

profilesRoutes.get("/", getAllProfiles);
profilesRoutes.get("/:id", getProfileById);
profilesRoutes.post("/", createProfile);
profilesRoutes.put("/:id", updateProfile);
profilesRoutes.delete("/:id", deleteProfile);

export default profilesRoutes;
