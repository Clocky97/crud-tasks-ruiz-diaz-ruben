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

// Obtener todas las tareas (solo no eliminadas)
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.findAll({
      where: { isDeleted: false },
      include: { model: Users, as: "user" },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener tareas", error });
  }
};

// Obtener tarea por ID (solo si no está eliminada)
export const getTaskById = async (req, res) => {
  try {
    const task = await Tasks.findOne({
      where: { id: req.params.id, isDeleted: false },
      include: { model: Users, as: "user" },
    });
    if (!task) return res.status(404).json({ msg: "Tarea no encontrada" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener tarea", error });
  }
};

// Actualizar tarea (solo si no está eliminada)
export const updateTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await Tasks.findOne({
      where: { id: req.params.id, isDeleted: false },
    });
    if (!task) return res.status(404).json({ msg: "Tarea no encontrada" });

    await task.update({ title, description });
    res.json(task);
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar tarea", error });
  }
};

// Eliminación lógica de tarea
export const deleteTask = async (req, res) => {
  try {
    const task = await Tasks.findOne({
      where: { id: req.params.id, isDeleted: false },
    });
    if (!task) return res.status(404).json({ msg: "Tarea no encontrada" });

    await task.update({ isDeleted: true });
    res.json({ msg: "Tarea eliminada lógicamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar tarea", error });
  }
};
