import { Users } from "../models/User.js";
import { Tasks } from "../models/Task.js";

//Obtener todos los usuarios con tareas
export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      include: {
        model: Tasks,
        as: "tasks",
        attributes: ["id", "title", "description", "isComplete"],
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener los usuarios" });
  }
};

//Obtener un usuario por ID con sus tareas
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findByPk(id, {
      include: {
        model: Tasks,
        as: "tasks",
        attributes: ["id", "title", "description", "isComplete"],
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener el usuario" });
  }
};

//Crear usuario
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    // Validar que el email no exista
    const existing = await Users.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ msg: "Ese email ya está en uso" });
    }

    const user = await Users.create({ name, email, password });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear el usuario" });
  }
};

//Actualizar usuario
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    if (email) {
      const existing = await Users.findOne({ where: { email } });
      if (existing && existing.id !== user.id) {
        return res.status(400).json({ msg: "Ese email ya está en uso" });
      }
    }

    await user.update({
      name: name ?? user.name,
      email: email ?? user.email,
      password: password ?? user.password,
    });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar el usuario" });
  }
};

//Eliminar usuario
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findByPk(id);

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    await user.destroy();
    res.status(200).json({ msg: "Usuario eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar el usuario" });
  }
};
