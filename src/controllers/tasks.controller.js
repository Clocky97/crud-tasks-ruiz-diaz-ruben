import { Tasks } from "../models/tasks.model.js";
import { Users } from "../models/users.model.js";

// Crear tarea
export const createTask = async (req, res) => {
  try {
    const { title, description, user_id } = req.body;
    const task = await Tasks.create({ title, description, user_id });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ msg: "Error al crear tarea", error });
  }
};

// Obtener todas las tareas
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.findAll({ include: { model: Users, as: "user" } });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener tareas", error });
  }
};

// Obtener tarea por ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Tasks.findByPk(req.params.id, { include: { model: Users, as: "user" } });
    if (!task) return res.status(404).json({ msg: "Tarea no encontrada" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener tarea", error });
  }
};

// Actualizar tarea
export const updateTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await Tasks.findByPk(req.params.id);
    if (!task) return res.status(404).json({ msg: "Tarea no encontrada" });

    await task.update({ title, description });
    res.json(task);
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar tarea", error });
  }
};

// Eliminar tarea
export const deleteTask = async (req, res) => {
  try {
    const task = await Tasks.findByPk(req.params.id);
    if (!task) return res.status(404).json({ msg: "Tarea no encontrada" });

    await task.destroy();
    res.json({ msg: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar tarea", error });
  }
};
