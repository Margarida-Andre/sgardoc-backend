const Turma = require("../models/Turma");
const GrauAcademico = require("../models/GrauAcademico");
const Turno = require("../models/Turno");
const Curso = require("../models/Curso");
const { Op } = require("@sequelize/core");

module.exports = {
  async getTurmasByCurso(req, res) {
    try {
      const { cursoId } = req.params;
      const turmasCurso = await Curso.findByPk(cursoId, {
        include: {
          association: "turma",
        },
      });

      if (!turmasCurso) {
        return res.status(400).json({ message: "Esse curso não existe" });
      }

      if (turmasCurso == 0) {
        return res
          .status(400)
          .json({ message: "Não existe nenhuma turma neste curso" });
      }

      return res.json(turmasCurso);
    } catch (error) {
      res.json(error);
    }
  },

  async getTurmasByGrauAcademico(req, res) {
    try {
      const { grauAcademicoId } = req.params;
      const turmasGrau = await GrauAcademico.findByPk(grauAcademicoId, {
        include: {
          association: "turma",
        },
      });

      if (!turmasGrau) {
        return res
          .status(400)
          .json({ message: "Esse grau acadêmico não existe" });
      }

      if (turmasGrau == 0) {
        return res
          .status(400)
          .json({ message: "Não existe nenhuma turma neste grau acadêmico" });
      }

      return res.json(turmasGrau);
    } catch (error) {
      res.json(error);
    }
  },

  async getTurmasByTurno(req, res) {
    try {
      const { turnoId } = req.params;
      const turmasTurno = await Turno.findByPk(turnoId, {
        include: {
          association: "turma",
        },
      });

      if (!turmasTurno) {
        return res.status(400).json({ message: "Esse turno não existe" });
      }

      if (turmasTurno == 0) {
        return res
          .status(400)
          .json({ message: "Não existe nenhuma turma neste turno" });
      }

      return res.json(turmasTurno);
    } catch (error) {
      res.json(error);
    }
  },

  async getTurmasByAnoLectivo(req, res) {
    try {
      const { inicioAnoLectivo } = req.params;
      const turma = await Turma.findAll({ where: { inicioAnoLectivo } });
      if (turma == 0) {
        return res
          .status(400)
          .json({ message: "Não existe nenhuma turma neste ano lectivo" });
      }
      return res.json(turma);
    } catch (error) {
      res.json(error);
    }
  },

  async getTurmas(req, res) {
    try {
      const turma = await Turma.findAll({
        order: [["designacao", "ASC"]],
        include: { all: true },
      });
      if (turma == 0) {
        return res.status(400).json({ message: "Não existe nenhuma turma" });
      }
      return res.json(turma);
    } catch (error) {
      res.json(error);
    }
  },

  async getTurma(req, res) {
    try {
      const { id } = req.params;
      const turma = await Turma.findOne({
        where: { id },
      });
      if (turma == 0) {
        return res.status(400).json({ message: "Esta turma não existe" });
      }
      return res.json(turma);
    } catch (error) {
      res.json(error);
    }
  },

  async createTurma(req, res) {
    try {
      const {
        cursoId,
        grauAcademicoId,
        turnoId,
        designacao,
        inicioAnoLectivo,
        finalAnoLectivo,
        criadoPor,
        actualizadoPor,
        descricao,
      } = req.body;

      const grau = await GrauAcademico.findByPk(grauAcademicoId, {
        include: [
          {
            association: "turma",
            where: {
              descricao,
            },
          },
        ],
        order: [["turma", "id", "ASC"]],
      });

      if (grau != null) {
        return res
          .status(400)
          .json({ message: "Esta turma já existe neste grau acadêmico" });
      }

      const turmaCreate = await Turma.create({
        cursoId,
        grauAcademicoId,
        turnoId,
        designacao,
        descricao,
        inicioAnoLectivo,
        finalAnoLectivo,
        criadoPor,
        actualizadoPor,
      });
      return res.json(turmaCreate);
    } catch (error) {
      res.json(error);
    }
  },

  async updateTurma(req, res) {
    try {
      const { id } = req.params;
      const {
        cursoId,
        grauAcademicoId,
        turnoId,
        designacao,
        descricao,
        inicioAnoLectivo,
        finalAnoLectivo,
        criadoPor,
        actualizadoPor,
      } = req.body;

      const turmaInexistente = await Turma.findByPk(id);
      if (!turmaInexistente) {
        return res.status(400).json({ message: "Esta turma não existe" });
      }

      const grau = await GrauAcademico.findByPk(grauAcademicoId, {
        include: [
          {
            association: "turma",
            where: { id: { [Op.ne]: req.params.id }, descricao },
          },
        ],
        order: [["turma", "id", "ASC"]],
      });

      if (grau != null) {
        return res
          .status(400)
          .json({ message: "Esta turma já existe neste grau acadêmico" });
      }

      const turmaUpdate = await Turma.update(
        {
          cursoId,
          grauAcademicoId,
          turnoId,
          designacao,
          descricao,
          inicioAnoLectivo,
          finalAnoLectivo,
          criadoPor,
          actualizadoPor,
        },
        { where: { id } }
      );
      return res.json({ message: "Turma actualizada com sucesso" });
    } catch (error) {
      res.json(error);
    }
  },

  async deleteTurma(req, res) {
    try {
      const { id } = req.params;
      const TurmaDelete = await Turma.destroy({ where: { id } });
      if (!TurmaDelete) {
        return res.json({ message: "Esta turma não existe" });
      }
      return res.json({ message: "Turma excluída com sucesso" });
    } catch (error) {
      res.json(error);
    }
  },
};
