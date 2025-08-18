import { Profile, Users } from "../models/index.js"

//Crear

export const createProfile = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ msg:   "user_id es obligatorio" });
    }

    const user = await Users.findByPk(user_id);
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    const existing = await Profile.findOne({ where: { user_id } });
    if (existing)
      return res.status(400).json({ msg: "El usuario ya tiene un perfil" });

    const profile = await Profile.create({ user_id });
    res.status(201).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear perfil" });
  }
};

//Obtener

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.findAll({
      include: { model: Users, as: "user", attributes: ["id", "name", "email"] }
    });
    res.status(200).json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener perfiles" });
  }
};

//Obtener por ID

export const getProfileById = async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await Profile.findByPk(id, {
      include: { model: Users, as: "user", attributes: ["id", "name", "email"] },
    });

    if (!profile) return res.status(404).json({ msg: "Perfil no encontrado" });

    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener el perfil" });
  }
};

//Actualizar

export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;

  try {
    const profile = await Profile.findByPk(id);
    if (!profile) return res.status(404).json({ msg: "Perfil no encontrado" });

    if (user_id) {
      const user = await Users.findByPk(user_id);
      if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

      const existing = await Profile.findOne({ where: { user_id } });
      if (existing && existing.id !== profile.id)
        return res.status(400).json({ msg: "El usuario ya tiene un perfil" });

      profile.user_id = user_id;
    }

    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar perfil" });
  }
};

//Borrar

export const deleteProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await Profile.findByPk(id);
    if (!profile) return res.status(404).json({ msg: "Perfil no encontrado" });

    await profile.destroy();
    res.status(200).json({ msg: "Perfil eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar perfil" });
  }
};
