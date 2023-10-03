const EstadoCivil = require("../models/EstadoCivil");

module.exports = {
  async getEstadoCivil(req, res) {
    try {
      const estadoCivil = await EstadoCivil.findAll();
      if (estadoCivil == 0) {
        return res
          .status(400)
          .json({ message: "Não existe nenhum estado civil" });
      }
      return res.json(estadoCivil);
    } catch (error) {
      res.json(error);
    }
  },
};
