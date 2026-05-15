require("dotenv").config();

const express = require("express");

const sequelize = require("./src/config/db");

const seedAdmin = require("./src/seeders/adminSeeder");
const seedModules = require("./src/seeders/moduleSeeder");

const authRoutes = require("./src/routes/auth.routes");
const adminRoutes = require("./src/routes/admin.routes");
const profileRoutes = require("./src/routes/profile.routes");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/profile", profileRoutes);

const startServer = async () => {
  try {
    await sequelize.sync({ alter: true });

    await seedAdmin();
    await seedModules();

    app.listen(process.env.PORT, () => {
      console.log(
        `Server running on port ${process.env.PORT}`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();