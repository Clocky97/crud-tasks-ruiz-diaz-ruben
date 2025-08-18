import { Tasks } from "../models/Task.js";
import { Users } from "../models/User.js";

//Obtener todas las tareas
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.findAll({
      include: {
        model: Users,
        as: "user",
        attributes: ["id", "name", "email"],
      },
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener las tareas" });
  }
};

//Obtener una tarea por ID con su usuario
export const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Tasks.findByPk(id, {
      include: {
        model: Users,
        as: "user",
        attributes: ["id", "name", "email"],
      },
    });

    if (!task) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener la tarea" });
  }
};

//Crear nueva tarea
export const createTask = async (req, res) => {
  try {
    let { title, description, isComplete, user_id } = req.body;

    if (!title || !description || !user_id) {
      return res
        .status(400)
        .json({ msg: "Título, descripción y user_id son obligatorios" });
    }

    // Verificar que el usuario exista
    const user = await Users.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    // Validar is_complete
    if (is_complete !== undefined) {
      if (typeof is_complete === "string") {
        is_complete =
          is_complete.toLowerCase() === "true"
            ? true
            : is_complete.toLowerCase() === "false"
            ? false
            : null;
        if (is_complete === null) {
          return res
            .status(400)
            .json({ msg: "is_complete debe ser true o false" });
        }
      } else if (typeof is_complete !== "boolean") {
        return res
          .status(400)
          .json({ msg: "is_complete debe ser booleano" });
      }
    }

    // Verificar que el titulo sea unico
    const existing = await Tasks.findOne({ where: { title } });
    if (existing) {
      return res.status(400).json({ msg: "Ese título ya está en uso." });
    }

    const task = await Tasks.create({ title, description, isComplete, user_id });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear la tarea" });
  }
};

//Actualizar una tarea
export const updateTask = async (req, res) => {
  const { id } = req.params;
  let { title, description, isComplete } = req.body;

  try {
    const task = await Tasks.findByPk(id);
    if (!task) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }

    // Validaciones como las del al create
    if (title !== undefined) {
      if (!title || title.trim() === "") {
        return res.status(400).json({ msg: "El título no puede estar vacío" });
      }
      const existing = await Tasks.findOne({ where: { title } });
      if (existing && existing.id !== task.id) {
        return res.status(400).json({ msg: "Ese título ya está en uso" });
      }
    }

    if (description !== undefined && description.trim() === "") {
      return res
        .status(400)
        .json({ msg: "La descripción no puede estar vacía" });
    }

    if (isComplete !== undefined) {
      if (typeof isComplete === "string") {
        isComplete =
          isComplete.toLowerCase() === "true"
            ? true
            : isComplete.toLowerCase() === "false"
            ? false
            : null;
        if (isComplete === null) {
          return res
            .status(400)
            .json({ msg: "isComplete debe ser true o false" });
        }
      } else if (typeof isComplete !== "boolean") {
        return res
          .status(400)
          .json({ msg: "isComplete debe ser booleano" });
      }
    }

    await task.update({
      title: title ?? task.title,
      description: description ?? task.description,
      isComplete: isComplete ?? task.isComplete,
    });

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar la tarea" });
  }
};

//Eliminar tarea
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Tasks.findByPk(id);

    if (!task) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }

    await task.destroy();
    res.status(200).json({ msg: "Tarea eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar la tarea" });
  }
};


