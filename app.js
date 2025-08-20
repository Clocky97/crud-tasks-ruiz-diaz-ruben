import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./src/config/database.js";
import tasksRoutes from "./src/routes/tasks.router.js";
import usersRoutes from "./src/routes/users.router.js";
import profilesRoutes from "./src/routes/profiles.router.js";
import jobsRoutes from "./src/routes/jobs.router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1212;

app.use(express.json());

app.use("/api/tasks", tasksRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/profiles", profilesRoutes);
app.use("/api/jobs", jobsRoutes);

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
