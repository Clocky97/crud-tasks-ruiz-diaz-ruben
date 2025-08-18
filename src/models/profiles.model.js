import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const Profile = sequelize.define("profiles", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
});

