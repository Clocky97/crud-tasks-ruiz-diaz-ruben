import { Users } from "../models/users.model.js";

export const getUsers = async (req, res) =>{
    const {id} = res.params.id();
    const users = await Users.findByPk(id);
    if (!users){
        console.log("No se encontraron usuarios.");
    }
    res.json(users);
};

export const getAllUsers = async (req, res) => {
    const users = await Users.findAll();
    res.json(users);
};

export const createUsers = async (req, res) => {
    const {name, email, password} = req.body;
    if (name === "" || email === "" || password === "") {
        return res.json({
            msg: "No pueden haber campos vacíos",
        });
    }
  try {
    const existing = await Users.findOne({ where: { name } });

    if (existing) {
      return res.status(400).json({ msg: "Ese nombre ya está en uso." });
    }

    const tasks = await Users.create(req.body);

    res.status(201).json(users);
    } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear" });
  }};
  
  export const updateUsers = async (req, res) => {
      const { id} = req.params;
      const {name, email, password} = req.body;
  
      try {
          const users = await Users.findByPk(id);
          if (!users) {
              return res.status(404).json({ msg: "Ususario no encontrado" });
          }
          if (name !== undefined) {
              if (!name || name.trim() === "") {
                  return res.status(400).json({ msg: "Su Nombre no puede estar vacío" });
              }

              if (email !== undefined) {
              if (!email || email.trim() === "") {
                  return res.status(400).json({ msg: "Ingrese su email" });
              }
              const existing = await Users.findOne({ 
                  where: { email } 
              });
              if (existing) {
                  return res.status(400).json({ msg: "Ese email ya está en uso" });
              }
                 
          }
          if (password !== undefined) {
              if (!password || password.trim() === "") {
                  return res.status(400).json({ msg: "Por favor ingrese una contraseña" });
              }
          }

          }
          await users.update({
              name: name ?? users.name,
              email: email ?? users.email,
              password: password ?? users.password
          });
  
          res.json(users);
  
      } catch (error) {
          console.error(error);
          res.status(500).json({ msg: "Error al actualizar" });
      }
  };
  export const deleteUsers = async (req, res) => {
      const {id} = req.params;
  
      try {
          const users = await Users.findByPk(id);
  
          if (!users) {
              return res.status(404).json({msg: "Nombre no encontrado"});
          }
          await users.destroy();
  
          res.json({ msg: "Nombre eliminado"});
  
      } catch (error) {
          console.error(error);
          res.status(500).json({msg: "Error al eliminar" });
      }
  };