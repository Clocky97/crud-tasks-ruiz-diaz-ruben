import { Users } from "./User.js";
import { Tasks } from "./Task.js";

Users.hasMany(Tasks, {
  foreignKey: "user_id",
  as: "tasks",
});

Tasks.belongsTo(Users, {
  foreignKey: "user_id",
  as: "user",
});

export { Users, Tasks };