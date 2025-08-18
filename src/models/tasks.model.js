import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const Tasks = sequelize.define("tasks", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  is_complete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});