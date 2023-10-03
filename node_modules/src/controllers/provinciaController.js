const Provincia = require("../models/Provincia");

module.exports = {
  async index(req, res) {
    const provinciasAll = await Provincia.findAll({
      order: [["id", "ASC"]],
    });
    if (provinciasAll == 0) {
      return res.status(400).json({ message: "Não existe nenhuma província" });
    }
    return res.json(provinciasAll);
  },

  async store(req, res) {
    const { designacao, criadoPor, actualizadoPor } = req.body;

    if (designacao === " ") {
      return res
        .status(400)
        .json({ message: "Digite a designação, por favor!" });
    }

    if (criadoPor === " ") {
      return res.status(400).json({ message: "Digite o criador, por favor!" });
    }

    if (actualizadoPor === " ") {
      return res
        .status(400)
        .json({ message: "Digite o actualizador, por favor!" });
    }

    const provinciaDesignacao = await Provincia.findOne({
      where: { designacao },
    });
    if (provinciaDesignacao != null) {
      return res.status(400).json({ message: "Esta província já existe" });
    }
    const provinciaCreate = await Provincia.create({
      designacao,
      criadoPor,
      actualizadoPor,
    });
    return res.json(provinciaCreate);
  },

  async delete(req, res) {
    const { id } = req.params;
    const provinciaDelete = await Provincia.destroy({ where: { id } });
    if (!provinciaDelete) {
      return res.json({ message: "Esta província não existe" });
    }
    return res.json({ message: "Dados excluídos com sucesso" });
  },

  async update(req, res) {
    const { id } = req.params;
    const { designacao } = req.body;

    const provinciaInexistente = await Provincia.findByPk(id);
    if (!provinciaInexistente) {
      return res.status(400).json({ message: "Esta província não existe" });
    }

    const provinciaNome = await Provincia.findOne({ where: { designacao } });
    if (provinciaNome != null) {
      return res.json({ message: "Esta província já existe" });
    }

    const provinciaUpdate = await Provincia.update(
      { designacao },
      { where: { id } }
    );
    return res.json({ message: "Dados actualizados com sucesso" });
  },
};
