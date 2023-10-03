const Permissao = require("../models/Permissao");
const Categoria = require("../models/Categoria");
const { Op } = require("@sequelize/core");

module.exports = {
  async getPermissoesByCategoria(req, res) {
    try {
      const { categoriaId } = req.params;

      const categoria = await Categoria.findOne({
        where: { id: categoriaId },
        include: [
          {
            association: "permissao",
          },
        ],
      });

      if (!categoria) {
        return response.status(400).json("Esta categoria não existe");
      }

      const mostrarPermissoes = categoria.permissao.map(
        (permissoes) => permissoes
      );

      if (!mostrarPermissoes) {
        return res
          .status(400)
          .json({ message: "Não existe nenhuma permissão" });
      }

      return res.json(categoria);
    } catch (error) {
      res.json(error);
    }
  },

  async createPermissao(req, res) {
    try {
      const { nome, descricao, criadoPor, actualizadoPor } = req.body;

      const permissaoNome = await Permissao.findOne({
        where: { nome },
      });
      if (permissaoNome != null) {
        return res.status(400).json({ message: "Esta permissão já existe" });
      }

      const permissaoDescricao = await Permissao.findOne({
        where: { descricao },
      });
      if (permissaoDescricao != null) {
        return res.status(400).json({ message: "Esta permissão já existe" });
      }

      const permissaoCreate = await Permissao.create({
        nome,
        descricao,
        criadoPor,
        actualizadoPor,
      });
      return res.json(permissaoCreate);
    } catch (error) {
      res.json(error);
    }
  },
};
