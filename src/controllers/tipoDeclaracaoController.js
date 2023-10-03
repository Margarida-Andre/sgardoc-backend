const TipoDeclaracao = require("../models/TipoDeclaracao");

module.exports = {
  async getTipoDeclaracao(req, res) {
    try {
      const tipo = await TipoDeclaracao.findAll({
        order: [["createdAt", "DESC"]],
      });
      if (tipo == 0) {
        return res
          .status(400)
          .json({ message: "Não existe nenhum tipo de declaração" });
      }
      return res.json(tipo);
    } catch (error) {
      res.json(error);
    }
  },
};
