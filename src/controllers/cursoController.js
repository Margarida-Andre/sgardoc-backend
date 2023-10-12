const Curso = require("../models/Curso");
const { Op } = require("@sequelize/core");

module.exports = {
  async getCursos(req, res) {
    try {
      const curso = await Curso.findAll({
        order: [["createdAt", "DESC"]],
      });
      if (curso == 0) {
        return res.status(400).json({ message: "Não existe nenhum curso" });
      }
      return res.json(curso);
    } catch (error) {
      res.json(error);
    }
  },

  async getCurso(req, res) {
    try {
      const { id } = req.params;
      const curso = await Curso.findOne({
        where: { id },
      });
      if (curso == 0) {
        return res.status(400).json({ message: "Este curso não existe" });
      }
      return res.json(curso);
    } catch (error) {
      res.json(error);
    }
  },

  async createCurso(req, res) {
    try {
      const { designacao, criadoPor, actualizadoPor } = req.body;

      const cursoDesignacao = await Curso.findOne({
        where: { designacao },
      });
      if (cursoDesignacao != null) {
        return res.status(400).json({ message: "Este curso já existe" });
      }

      const cursoCreate = await Curso.create({
        designacao,
        criadoPor,
        actualizadoPor,
      });
      return res.json(cursoCreate);
    } catch (error) {
      res.json(error);
    }
  },

  async updateCurso(req, res) {
    try {
      const { id } = req.params;
      const { designacao, criadoPor, actualizadoPor } = req.body;

      const cursoInexistente = await Curso.findByPk(id);
      if (!cursoInexistente) {
        return res.status(400).json({ message: "Este curso não existe" });
      }

      const cursoDesignacao = await Curso.findOne({
        where: { id: { [Op.ne]: req.params.id }, designacao },
      });
      if (cursoDesignacao != null) {
        return res.status(400).json({ message: "Este curso já existe" });
      }

      const cursoUpdate = await Curso.update(
        {
          designacao,
          criadoPor,
          actualizadoPor,
        },
        { where: { id } }
      );
      return res.json({ message: "Curso actualizado com sucesso" });
    } catch (error) {
      res.json(error);
    }
  },

  async deleteCurso(req, res) {
    try {
      const { id } = req.params;
      const cursoDelete = await Curso.destroy({ where: { id } });
      if (!cursoDelete) {
        return res.json({ message: "Este curso não existe" });
      }
      return res.json({ message: "Curso excluído com sucesso" });
    } catch (error) {
      res.json(error);
    }
  },
};
