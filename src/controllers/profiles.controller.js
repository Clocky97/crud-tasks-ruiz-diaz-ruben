import { Profiles } from "../models/profiles.model.js";
import { Users } from "../models/users.model.js";
import { Jobs } from "../models/jobs.model.js";

// Crear perfil
export const createProfile = async (req, res) => {
  try {
    const { bio, user_id, job_id } = req.body;

    const profile = await Profiles.create({ bio, user_id, job_id });
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ msg: "Error al crear perfil", error });
  }
};

// Obtener todos los perfiles
export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profiles.findAll({
      include: [
        { model: Users, as: "user" },
        { model: Jobs, as: "job" },
      ],
    });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener perfiles", error });
  }
};

// Obtener perfil por ID
export const getProfileById = async (req, res) => {
  try {
    const profile = await Profiles.findByPk(req.params.id, {
      include: [
        { model: Users, as: "user" },
        { model: Jobs, as: "job" },
      ],
    });
    if (!profile) return res.status(404).json({ msg: "Perfil no encontrado" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener perfil", error });
  }
};

// Actualizar perfil
export const updateProfile = async (req, res) => {
  try {
    const { job_id } = req.body;
    const profile = await Profiles.findByPk(req.params.id);
    if (!profile) return res.status(404).json({ msg: "Perfil no encontrado" });

    await profile.update({ job_id });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar perfil", error });
  }
};

// Eliminar perfil
export const deleteProfile = async (req, res) => {
  try {
    const profile = await Profiles.findByPk(req.params.id);
    if (!profile) return res.status(404).json({ msg: "Perfil no encontrado" });

    await profile.destroy();
    res.json({ msg: "Perfil eliminado" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar perfil", error });
  }
};
