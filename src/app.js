const express = require("express");
const path = require("path");
const sequelize = require("./config/database");

const auth = require("./middleware/auth");
const authRoutes = require("./routes/auth.routes");
const appointmentRoutes = require("./routes/appointment.routes");

// garantir que os modelos sejam carregados (registrar associações)
require("./models/User");
require("./models/Pet");
require("./models/Service");
require("./models/Appointment");

const app = express();
app.use(express.json());

// Cabeçalhos de segurança (CSP) — permitir fontes e estilos do Google Fonts e arquivos locais
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; font-src 'self' https://fonts.gstatic.com data:;"
  );
  next();
});

// servir arquivos estáticos da pasta correta (src/public)
app.use(express.static(path.join(__dirname, "public")));

// 🔹 ROTAS DE API
app.use("/auth", authRoutes);
app.use("/appointments", appointmentRoutes);

// 🔹 ROTAS DE PÁGINA
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register.html"));
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

app.get("/agendar", auth, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "agendar.html"));
});

// 🔹 INICIAR SERVIDOR APÓS CONEXÃO/CRIAÇÃO DO DB
const PORT = process.env.PORT || 3000;
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`PetsCare rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error("Erro ao iniciar o servidor:", err);
  }
})();
