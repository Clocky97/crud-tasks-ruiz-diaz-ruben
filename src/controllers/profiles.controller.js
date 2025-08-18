import { Profile } from "../models/profiles.model.js";
import { Users } from "../models/users.model.js";

// Crear perfil
export const createProfile = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ msg: "user_id es obligatorio" });
    }

    const user = await Users.findByPk(user_id);
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    const existing = await Profile.findOne({ where: { user_id } });
    if (existing)
      return res.status(400).json({ msg: "El usuario ya tiene un perfil" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear perfil" });
  }
};

// Obtener todos los perfiles con usuario
export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.findAll({
      include: { model: Users, as: "user", attributes: ["id", "name", "email"] },
    });
    res.status(200).json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener perfiles" });
  }
};
