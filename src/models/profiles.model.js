import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Users } from "./users.model.js";
import { Jobs } from "./jobs.model.js";

export const Profiles = sequelize.define("profiles", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  bio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true, // solo un perfil
  },
  job_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Relaciones
Profiles.belongsTo(Users, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "CASCADE",
});
Profiles.belongsTo(Jobs, {
  foreignKey: "job_id",
  as: "job",
  onDelete: "CASCADE",
});
Users.hasOne(Profiles, {
  foreignKey: "user_id",
  as: "profile",
  onDelete: "CASCADE",
});
Jobs.hasMany(Profiles, {
  foreignKey: "job_id",
  as: "profiles",
  onDelete: "CASCADE",
});
