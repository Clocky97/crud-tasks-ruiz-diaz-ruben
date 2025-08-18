import express from "express";
import dotenv from "dotenv";
import tasksRoutes from "./src/routes/tasks.router.js";
import usersRoutes from "./src/routes/users.router.js";
import profilesRoutes from "./src/routes/profiles.router.js";
import rolesRoutes from "./src/routes/roles.router.js";

import { sequelize } from "./src/models/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1212;

app.use(express.json());

app.use("/api/tasks", tasksRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/profiles", profilesRoutes);
app.use("/api/roles", rolesRoutes);

const startServer = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Base de datos sincronizada");

    app.listen(PORT, () => {
      console.log(`Servidor en funcionamiento en puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error al sincronizar la base de datos:", error);
  }
};

startServer();

export default app;
