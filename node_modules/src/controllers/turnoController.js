const Turno = require("../models/Turno");

module.exports = {
  async getTurnos(req, res) {
    try {
      const turno = await Turno.findAll();
      if (turno == 0) {
        return res.status(400).json({ message: "Não existe nenhum turno" });
      }
      return res.json(turno);
    } catch (error) {
      res.json(error);
    }
  },
};
