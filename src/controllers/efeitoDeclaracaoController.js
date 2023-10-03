const EfeitoDeclaracao = require("../models/EfeitoDeclaracao");

module.exports = {
  async getEfeitoDeclaracao(req, res) {
    try {
      const efeito = await EfeitoDeclaracao.findAll({
        order: [["createdAt", "DESC"]],
      });
      if (efeito == 0) {
        return res
          .status(400)
          .json({ message: "Não existe nenhum efeito de declaração" });
      }
      return res.json(efeito);
    } catch (error) {
      res.json(error);
    }
  },
};
