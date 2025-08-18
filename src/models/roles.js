import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { Users } from "./users.model.js";

export const Role = sequelize.define("roles", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
});

// Tabla usuario-roles

export const UserRoles = sequelize.define("user_roles", {
  user_id: {
    type: DataTypes.INTEGER,
    references: { model: Users, key: "id" },
  },
  role_id: {
    type: DataTypes.INTEGER,
    references: { model: Role, key: "id" },
  },
});

//Relaciones
Users.belongsToMany(Role, { through: UserRoles, foreignKey: "user_id", as: "roles" });
Role.belongsToMany(Users, { through: UserRoles, foreignKey: "role_id", as: "users" });
