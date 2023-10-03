const { hash } = require("bcryptjs");
const Usuario = require("../models/Usuario");
const Categoria = require("../models/Categoria");
const { Op } = require("@sequelize/core");

module.exports = {
  async getUsuarios(req, res) {
    try {
      const usuario = await Usuario.findAll({
        order: [["createdAt", "DESC"]],
      });
      if (usuario == 0) {
        return res.status(400).json({ message: "Não existe nenhum usuário" });
      }
      return res.json(usuario);
    } catch (error) {
      res.json(error);
    }
  },

  async createUsuario(req, res) {
    try {
      const { categoriaId } = req.params;
      const { nome, email, numeroProcesso, senha, criadoPor, actualizadoPor } =
        req.body;

      const usuarioEmail = await Usuario.findOne({
        where: { email },
      });
      if (usuarioEmail != null) {
        return res.status(400).json({ message: "Este email já existe" });
      }

      const usuarioProcesso = await Usuario.findOne({
        where: { numeroProcesso },
      });
      if (usuarioProcesso != null) {
        return res
          .status(400)
          .json({ message: "Este número de processo já existe" });
      }

      const categoria = await Categoria.findByPk(categoriaId);
      if (!categoria) {
        return res.status(400).json({ message: "Esta categoria não existe" });
      }

      const senhaHash = await hash(senha, 14);

      const [usuarioCreate] = await Usuario.findOrCreate({
        where: {
          nome,
          email,
          numeroProcesso,
          senha: senhaHash,
          criadoPor,
          actualizadoPor,
        },
      });

      await usuarioCreate.addCategoria(categoria);

      return res.json({ usuarioCreate, message: "Usuário criado com sucesso" });
    } catch (error) {
      res.json(error);
    }
  },

  async updateUsuario(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, numeroProcesso, senha, criadoPor, actualizadoPor } =
        req.body;

      const usuarioInexistente = await Usuario.findByPk(id);
      if (!usuarioInexistente) {
        return res.status(400).json({ message: "Este usuário não existe" });
      }

      const usuarioEmail = await Usuario.findOne({
        where: { id: { [Op.ne]: req.params.id }, email },
      });
      if (usuarioEmail != null) {
        return res.status(400).json({ message: "Este email já existe" });
      }

      const usuarioProcesso = await Usuario.findOne({
        where: { id: { [Op.ne]: req.params.id }, numeroProcesso },
      });
      if (usuarioProcesso != null) {
        return res
          .status(400)
          .json({ message: "Este número de processo já existe" });
      }

      const usuarioUpdate = await Usuario.update(
        {
          nome,
          email,
          numeroProcesso,
          senha,
          criadoPor,
          actualizadoPor,
        },
        { where: { id } }
      );
      return res.json({usuarioUpdate, message: "Usuário actualizado com sucesso" });
    } catch (error) {
      res.json(error);
    }
  },

  async deleteUsuario(req, res) {
    try {
      const { id } = req.params;
      const usuarioDelete = await Usuario.destroy({ where: { id } });
      if (!usuarioDelete) {
        return res.json({ message: "Este usuário não existe" });
      }
      return res.json({ message: "Usuário excluído com sucesso" });
    } catch (error) {
      res.json(error);
    }
  },
};
