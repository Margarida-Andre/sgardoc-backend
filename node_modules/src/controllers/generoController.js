const Genero = require("../models/Genero");

module.exports = {
  async getGeneros(req, res) {
    try {
      const genero = await Genero.findAll();
      if (genero == 0) {
        return res.status(400).json({ message: "Não existe nenhum genero" });
      }
      return res.json(genero);
    } catch (error) {
      res.json(error);
    }
  },
};
