import { Role, Users } from "../models/roles.js";

// Crear rol
export const createRole = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ msg: "Nombre obligatorio" });

    const existing = await Role.findOne({ where: { name } });
    if (existing) return res.status(400).json({ msg: "Rol ya existe" });

    const role = await Role.create({ name });
    res.status(201).json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear rol" });
  }
};

// Obtener todos los roles con usuarios
export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      include: { model: Users, as: "users", attributes: ["id", "name", "email"] },
    });
    res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener roles" });
  }
};
