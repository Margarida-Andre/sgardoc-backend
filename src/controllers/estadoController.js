const Estado = require("../models/Estado");

module.exports = {
  async getEstado(req, res) {
    try {
      const estado = await Estado.findAll();
      if (estado == 0) {
        return res.status(400).json({ message: "Não existe nenhum estado" });
      }
      return res.json(estado);
    } catch (error) {
      res.json(error);
    }
  },
};
