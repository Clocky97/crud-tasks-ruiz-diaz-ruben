import { sequelize } from "../config/database.js";
import { Users } from "./users.model.js";
import { Tasks } from "./tasks.model.js";
import { Profile } from "./profiles.model.js";
import { Role, UserRoles } from "./roles.model.js";

Users.hasMany(Tasks, {
  foreignKey: "user_id",
  as: "tasks",
});
Tasks.belongsTo(Users, {
  foreignKey: "user_id",
  as: "user",
});

Users.hasOne(Profile, {
  foreignKey: "user_id",
  as: "userProfile",
});
Profile.belongsTo(Users, {
  foreignKey: "user_id",
  as: "profileOwner",
});

Users.belongsToMany(Role, {
  through: UserRoles,
  foreignKey: "user_id",
  as: "roles",
});
Role.belongsToMany(Users, {
  through: UserRoles,
  foreignKey: "role_id",
  as: "usersWithRole",
});

export { sequelize, Users, Tasks, Profile, Role, UserRoles };

