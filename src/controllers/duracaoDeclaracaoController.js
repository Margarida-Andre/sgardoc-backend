const DuracaoDeclaracao = require("../models/DuracaoDeclaracao");

module.exports = {
  async getDuracaoDeclaracao(req, res) {
    try {
      const duracao = await DuracaoDeclaracao.findAll({
        order: [["createdAt", "DESC"]],
      });
      if (duracao == 0) {
        return res
          .status(400)
          .json({ message: "Não existe nenhuma duração de declaração" });
      }
      return res.json(duracao);
    } catch (error) {
      res.json(error);
    }
  },
};
