import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const Role = sequelize.define("roles", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
});

export const UserRoles = sequelize.define("user_roles", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});


