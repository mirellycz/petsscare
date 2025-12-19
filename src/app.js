const express = require("express");
const path = require("path");
const sequelize = require("./config/database");

const auth = require("./middleware/auth");
const authRoutes = require("./routes/auth.routes");
const appointmentRoutes = require("./routes/appointment.routes");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// 🔹 ROTAS DE API
app.use("/auth", authRoutes);
app.use("/appointments", appointmentRoutes);

// 🔹 ROTAS DE PÁGINA
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views/login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views/register.html"));
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "views/home.html"));
});

app.get("/agendar", auth, (req, res) => {
  res.sendFile(path.join(__dirname, "views/agendar.html"));
});

// 🔹 INICIAR SERVIDOR
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`PetsCare rodando na porta ${PORT}`);
});
