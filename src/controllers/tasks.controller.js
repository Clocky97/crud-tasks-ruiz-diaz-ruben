import { Character } from "../models/character.model.js";

export const getCharacter = async (req, res) =>{
    const id = res.params.id();
    const character = await Character.findByPk(id);
    if (!character){
        console.log("No se encontró un usuario con esa ID.");
    }
    res.json(character);
};

export const getAllCharacters = async (req, res) => {
    const character = await Character.findAll();
    res.json(character);
};

export const createCharacters = async (req, res) => {
    const {name, ki, race, gender, description} = req.body;
    if (name === "" || ki === "" || race === "" || gender === "" || description === "") {
        return res.json({
            msg: "Hay campos  vacíos",
        });
    }
    if (isNaN(ki)) {
        return res.json({
            msg: "El KI ingresado no es válido."
        });
    }
  if (gender !== "male" && gender !== "female") {
    return res.status(400).json({ msg: "El género debe ser 'male' o 'female'" });
  }

  try {
    const existing = await Character.findOne({ where: { name } });

    if (existing) {
      return res.status(400).json({ msg: "Ese nombre ya está en uso." });
    }


    const character = await Character.create(req.body);

    res.status(201).json(character);
    } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear personaje" });
  }};