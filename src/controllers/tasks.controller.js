import { Tasks } from "../models/tasks.model.js";

export const getTasks = async (req, res) =>{
    const {id} = res.params.id();
    const tasks = await Tasks.findByPk(id);
    if (!tasks){
        console.log("No se encontraron tareas.");
    }
    res.json(tasks);
};

export const getAllTasks = async (req, res) => {
    const tasks = await Tasks.findAll();
    res.json(tasks);
};

export const createTasks = async (req, res) => {
    const {title, description} = req.body;
    if (title === "" || description === "") {
        return res.json({
            msg: "Título y descripción son obligatorios",
        });
    }
    if (isComplete !== undefined) {
    if (typeof isComplete === "string") {
        if (isComplete.toLowerCase() === "true") {
            isComplete = true;
        } else if (isComplete.toLowerCase() === "false") {
            isComplete = false;
        } else {
            return res.status(400).json({ msg: "isComplete debe ser true o false" });
        }
        } else if (typeof isComplete !== "boolean") {
            return res.status(400).json({ msg: "isComplete debe ser booleano" });
        }
    }
  try {
    const existing = await Tasks.findOne({ where: { title } });

    if (existing) {
      return res.status(400).json({ msg: "Ese nombre ya está en uso." });
    }

    const tasks = await Tasks.create(req.body);

    res.status(201).json(tasks);
    } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear" });
  }};

export const updateTask = async (req, res) => {
    const { id} = req.params;
    let {title, description, isComplete} = req.body;

    try {
        const task = await Tasks.findByPk(id);
        if (!task) {
            return res.status(404).json({ msg: "Tarea no encontrada" });
        }
        if (title !== undefined) {
            if (!title || title.trim() === "") {
                return res.status(400).json({ msg: "El título no puede estar vacío" });
            }
            const existing = await Tasks.findOne({ 
                where: { title, id: { [Op.ne]: id } }
            });
            if (existing) {
                return res.status(400).json({ msg: "Ese título ya está en uso" });
            }
        }
        if (description !== undefined) {
            if (!description || description.trim() === "") {
                return res.status(400).json({ msg: "La descripción no puede estar vacía" });
            }
        }
        if (isComplete !== undefined) {
            if (typeof isComplete === "string") {
                if (isComplete.toLowerCase() === "true") {
                    isComplete = true;
                } else if (isComplete.toLowerCase() === "false") {
                    isComplete = false;
                } else {
                    return res.status(400).json({ msg: "isComplete debe ser true o false" });
                }
            } else if (typeof isComplete !== "boolean") {
                return res.status(400).json({ msg: "isComplete debe ser booleano" });
            }
        }
        await task.update({
            title: title ?? task.title,
            description: description ?? task.description,
            isComplete: isComplete ?? task.isComplete
        });

        res.json(task);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar la tarea" });
    }
};
export const deleteTask = async (req, res) => {
    const {id} = req.params;

    try {
        const task = await Tasks.findByPk(id);

        if (!task) {
            return res.status(404).json({msg: "Tarea no encontrada"});
        }
        await task.destroy();

        res.json({ msg: "Tarea eliminada"});

    } catch (error) {
        console.error(error);
        res.status(500).json({msg: "Error al eliminar la tarea" });
    }
};

