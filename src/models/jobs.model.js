import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserJobs } from "./userJobs.model.js";
import { Users } from "./users.model.js";

export const Jobs = sequelize.define("jobs", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
