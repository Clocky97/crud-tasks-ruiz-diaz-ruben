import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Users } from "./users.model.js";
import { Jobs } from "./jobs.model.js";

export const UserJobs = sequelize.define("user_jobs", {
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Users,
      key: "id",
    },
  },
  job_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Jobs,
      key: "id",
    },
  },
});

Jobs.belongsToMany(Users, {
  through: UserJobs,
  foreignKey: "job_id",
  as: "users",
  onDelete: "CASCADE",
});
Users.belongsToMany(Jobs, {
  through: UserJobs,
  foreignKey: "user_id",
  as: "jobs",
  onDelete: "CASCADE",
});
