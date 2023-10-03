const Categoria = require("../models/Categoria");
const Permissao = require("../models/Permissao");
const { Op } = require("@sequelize/core");

module.exports = {
  async createCategoria(req, res) {
    try {
      const { nome, descricao, criadoPor, actualizadoPor, permissaoId } =
        req.body;

      const categoriaNome = await Categoria.findOne({
        where: { nome },
      });
      if (categoriaNome != null) {
        return res.status(400).json({ message: "Esta categoria já existe" });
      }

      const categoriaDescricao = await Categoria.findOne({
        where: { descricao },
      });
      if (categoriaDescricao != null) {
        return res
          .status(400)
          .json({ message: "Esta descrição de categoria já existe" });
      }

      const permissao = await Permissao.findByPk(permissaoId);
      if (!permissao) {
        return res.status(400).json({ message: "Esta permissão não existe" });
      }

      const [categoriaCreate] = await Categoria.findOrCreate({
        where: {
          nome,
          descricao,
          criadoPor,
          actualizadoPor,
        },
      });

      await categoriaCreate.addPermissao(permissao);

      return res.json(categoriaCreate);
    } catch (error) {
      res.json(error);
    }
  },
};
