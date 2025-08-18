import { sequelize } from "../config/database.js";

import { Users } from "./users.model.js";
import { Tasks } from "./tasks.model.js";
import { Profile } from "./profiles.model.js";
import { Role, UserRoles } from "./roles.model.js";

//relaciones Users a Tasks
Users.hasMany(Tasks, { foreignKey: "user_id", as: "tasks" });
Tasks.belongsTo(Users, { foreignKey: "user_id", as: "user" });

//Relaciones Users a Profile, 1 a 1
Users.hasOne(Profile, { foreignKey: "user_id", as: "profile" });
Profile.belongsTo(Users, { foreignKey: "user_id", as: "user" });

//relaciones Users a Role
Users.belongsToMany(Role, { through: UserRoles, foreignKey: "user_id", as: "roles" });
Role.belongsToMany(Users, { through: UserRoles, foreignKey: "role_id", as: "users" });

export { sequelize, Users, Tasks, Profile, Role, UserRoles };
