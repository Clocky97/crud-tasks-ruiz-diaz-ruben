import { Jobs } from "../models/jobs.model.js";
import { Profiles } from "../models/profiles.model.js";

// Crear oficio
export const createJob = async (req, res) => {
  try {
    const { nombre } = req.body;
    const job = await Jobs.create({ nombre });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ msg: "Error al crear oficio", error });
  }
};

// Obtener todos los oficios
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Jobs.findAll({ include: { model: Profiles, as: "profiles" } });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener oficios", error });
  }
};

// Obtener oficio por ID
export const getJobById = async (req, res) => {
  try {
    const job = await Jobs.findByPk(req.params.id, { include: { model: Profiles, as: "profiles" } });
    if (!job) return res.status(404).json({ msg: "oficio no encontrado" });
    res.json(job);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener oficio", error });
  }
};

// Actualizar oficio
export const updateJob = async (req, res) => {
  try {
    const { nombre, prioridad } = req.body;
    const job = await Jobs.findByPk(req.params.id);
    if (!job) return res.status(404).json({ msg: "oficio no encontrado" });

    await job.update({ nombre, prioridad });
    res.json(job);
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar oficio", error });
  }
};

// Eliminar oficio
export const deleteJob = async (req, res) => {
  try {
    const job = await Jobs.findByPk(req.params.id);
    if (!job) return res.status(404).json({ msg: "oficio no encontrado" });

    await job.destroy();
    res.json({ msg: "oficio eliminado" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar oficio", error });
  }
};
