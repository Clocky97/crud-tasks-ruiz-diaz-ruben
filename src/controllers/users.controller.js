import { Users } from "../models/users.model.js";
import { Profiles } from "../models/profiles.model.js";
import { Tasks } from "../models/tasks.model.js";

// Crear usuario
export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await Users.create({ username, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ msg: "Error al crear usuario", error });
  }
};

// Obtener todos los usuarios (solo los no eliminados)
export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      where: { isDeleted: false },
      include: [
        { model: Profiles, as: "profile" },
        { model: Tasks, as: "tasks" },
      ],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener usuarios", error });
  }
};

// Obtener usuario por ID (solo si no está eliminado)
export const getUserById = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { id: req.params.id, isDeleted: false },
      include: [
        { model: Profiles, as: "profile" },
        { model: Tasks, as: "tasks" },
      ],
    });
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener usuario", error });
  }
};

// Actualizar usuario (solo si no está eliminado)
export const updateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await Users.findOne({
      where: { id: req.params.id, isDeleted: false },
    });
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    await user.update({ username, email, password });
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar usuario", error });
  }
};

// Eliminación lógica de usuario
export const deleteUser = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { id: req.params.id, isDeleted: false },
    });
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    await user.update({ isDeleted: true });
    res.json({ msg: "Usuario eliminado lógicamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar usuario", error });
  }
};
