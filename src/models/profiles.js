import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { Users } from "./users.model.js";

export const Profile = sequelize.define("profiles", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bio: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  avatar_url: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true, //clave unica para 1 a 1
  },
});

//Relaciones
Users.hasOne(Profile, { foreignKey: "user_id", as: "profile" });
Profile.belongsTo(Users, { foreignKey: "user_id", as: "user" });
