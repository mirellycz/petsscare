// src/routes/appointment.routes.js
const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const auth = require("../middleware/auth");

// criar agendamento
router.post("/", auth, async (req, res) => {
  try {
    const { petName, service, date } = req.body;

    // validação de campos
    if (!petName || !service || !date) {
      return res.status(400).json({
        error: "Preencha todos os campos"
      });
    }

    const appointmentDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (appointmentDate < today) {
      return res.status(400).json({
        error: "Não é permitido agendar serviços em datas passadas"
      });
    }

    const appointment = await Appointment.create({
      petName,
      service,
      date: appointmentDate
    });

    res.json({
      message: "Serviço agendado com sucesso!",
      appointment
    });

  } catch (err) {
    console.error(err);
    res.status(400).json({
      error: "Erro ao agendar serviço"
    });
  }
});

// cancelar agendamento
router.delete("/:id", auth, async (req, res) => {
  try {
    await Appointment.destroy({ where: { id: req.params.id } });
    res.json({ message: "Agendamento cancelado com sucesso!" });
  } catch (err) {
    res.status(400).json({ error: "Erro ao cancelar agendamento" });
  }
});

module.exports = router;

