const Semestre = require("../models/Semestre");

module.exports = {
  async getSemestres(req, res) {
    try {
      const semestre = await Semestre.findAll();
      if (semestre == 0) {
        return res.status(400).json({ message: "Não existe nenhum semestre" });
      }
      return res.json(semestre);
    } catch (error) {
      res.json(error);
    }
  },
};
