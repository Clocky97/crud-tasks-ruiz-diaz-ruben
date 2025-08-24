import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Jobs } from "./jobs.model.js";
import { UserJobs } from "./userJobs.model.js";

export const Users = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Users.belongsToMany(Jobs, 
  { through: UserJobs, 
    foreignKey: "user_id", 
    as: "jobs", 
    onDelete: "CASCADE"
  });




