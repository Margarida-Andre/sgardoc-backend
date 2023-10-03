const GrauAcademico = require("../models/GrauAcademico");
const Curso = require("../models/Curso");
const { Op } = require("@sequelize/core");

module.exports = {
  async getGrauByCurso(req, res) {
    try {
      const { cursoId } = req.params;
      const grauCurso = await Curso.findByPk(cursoId, {
        include: [
          {
            association: "grauAcademico",
          },
        ],
        order: [["grauAcademico", "grau", "ASC"]],
      });

      if (!grauCurso) {
        return res.status(400).json({ message: "Esse curso não existe" });
      }

      if (grauCurso.grauAcademico == 0) {
        return res
          .status(400)
          .json({ message: "Não existe nenhum grau acadêmico neste curso" });
      }

      return res.json(grauCurso);
    } catch (error) {
      res.json(error);
    }
  },

  async getGrauAcademico(req, res) {
    try {
      const grauAcademico = await GrauAcademico.findAll({
        order: [["grau", "ASC"]],
      });
      if (grauAcademico == 0) {
        return res
          .status(400)
          .json({ message: "Não existe nenhum grau acadêmico" });
      }
      return res.json(grauAcademico);
    } catch (error) {
      res.json(error);
    }
  },

  async createGrauAcademico(req, res) {
    try {
      const { cursoId, grau, descricao, criadoPor, actualizadoPor } = req.body;

      const grauAcademico = await GrauAcademico.findOne({
        where: { grau, cursoId: req.body.cursoId },
      });
      if (grauAcademico != null) {
        return res
          .status(400)
          .json({ message: "Este grau acadêmico já existe neste curso" });
      }

      const grauCreate = await GrauAcademico.create({
        cursoId,
        grau,
        descricao,
        criadoPor,
        actualizadoPor,
      });
      return res.json(grauCreate);
    } catch (error) {
      res.json(error);
    }
  },

  async updateGrauAcademico(req, res) {
    try {
      const { id } = req.params;
      const { cursoId, grau, descricao, criadoPor, actualizadoPor } = req.body;

      const grauInexistente = await GrauAcademico.findByPk(id);
      if (!grauInexistente) {
        return res
          .status(400)
          .json({ message: "Este grau acadêmico não existe" });
      }

      const grauAcademico = await GrauAcademico.findOne({
        where: { id: { [Op.ne]: req.params.id }, grau },
      });
      if (grauAcademico != null) {
        return res
          .status(400)
          .json({ message: "Este grau acadêmico já existe" });
      }

      const grauUpdate = await GrauAcademico.update(
        {
          cursoId,
          grau,
          descricao,
          criadoPor,
          actualizadoPor,
        },
        { where: { id } }
      );
      return res.json({ message: "Grau acadêmico actualizado com sucesso" });
    } catch (error) {
      res.json(error);
    }
  },

  async deleteGrauAcademico(req, res) {
    try {
      const { id } = req.params;
      const grauDelete = await GrauAcademico.destroy({ where: { id } });
      if (!grauDelete) {
        return res.json({ message: "Este grau acadêmico não existe" });
      }
      return res.json({ message: "Grau acadêmico excluído com sucesso" });
    } catch (error) {
      res.json(error);
    }
  },
};
