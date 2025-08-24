import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Users } from "./users.model.js";

export const Tasks = sequelize.define("tasks", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Relación User -> Tasks
Users.hasMany(Tasks, { foreignKey: "user_id", as: "tasks" });
Tasks.belongsTo(Users, { foreignKey: "user_id", as: "user" });
