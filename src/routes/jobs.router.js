import { Router } from "express";
import {
  getJobById,
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobs.controller.js";

const jobsRoutes = Router();

jobsRoutes.get("/", getAllJobs);
jobsRoutes.get("/:id", getJobById);
jobsRoutes.post("/", createJob);
jobsRoutes.put("/:id", updateJob);
jobsRoutes.delete("/:id", deleteJob);

export default jobsRoutes;
