const Disciplina = require("../models/Disciplina");
const GrauAcademico = require("../models/GrauAcademico");

module.exports = {
  async getDisciplinas(req, res) {
    try {
      const disciplina = await Disciplina.findAll();
      if (disciplina == 0) {
        return res
          .status(400)
          .json({ message: "Não existe nenhuma disciplina" });
      }
      return res.json(disciplina);
    } catch (error) {
      res.json(error);
    }
  },

  async getDisciplina(req, res) {
    try {
      const { id } = req.params;
      const disciplina = await Disciplina.findOne({
        where: { id },
      });
      if (disciplina == 0) {
        return res.status(400).json({ message: "Esta disciplina não existe" });
      }
      return res.json(disciplina);
    } catch (error) {
      res.json(error);
    }
  },

  async getDisciplinasByGrauAcademico(req, res) {
    try {
      const { grauAcademicoId } = req.params;
      const disciplinasGrau = await GrauAcademico.findByPk(grauAcademicoId, {
        include: {
          association: "disciplina",
        },
      });

      if (!disciplinasGrau) {
        return res
          .status(400)
          .json({ message: "Esse grau acadêmico não existe" });
      }

      if (disciplinasGrau == 0) {
        return res
          .status(400)
          .json({
            message: "Não existe nenhuma disciplina neste grau acadêmico",
          });
      }

      return res.json(disciplinasGrau);
    } catch (error) {
      res.json(error);
    }
  },

  async createDisciplina(req, res) {
    try {
      const {
        designacao,
        descricao,
        semestreId,
        grauAcademicoId,
        criadoPor,
        actualizadoPor,
      } = req.body;

      const disciplinaDesignacao = await Disciplina.findOne({
        where: { designacao },
      });
      if (disciplinaDesignacao != null) {
        return res
          .status(400)
          .json({ message: "Esta designação de disciplina já existe" });
      }

      const disciplinaDescricao = await Disciplina.findOne({
        where: { designacao },
      });
      if (disciplinaDescricao != null) {
        return res
          .status(400)
          .json({ message: "Esta descrição de disciplina já existe" });
      }

      const disciplinaCreate = await Disciplina.create({
        designacao,
        descricao,
        semestreId,
        grauAcademicoId,
        criadoPor,
        actualizadoPor,
      });
      return res.json(disciplinaCreate);
    } catch (error) {
      res.json(error);
    }
  },

  async updateDisciplina(req, res) {
    try {
      const { id } = req.params;
      const {
        designacao,
        descricao,
        semestreId,
        grauAcademicoId,
        criadoPor,
        actualizadoPor,
      } = req.body;

      const cursoInexistente = await Disciplina.findByPk(id);
      if (!cursoInexistente) {
        return res.status(400).json({ message: "Esta disciplina não existe" });
      }

      const disciplinaDesignacao = await Disciplina.findOne({
        where: { id: { [Op.ne]: req.params.id }, designacao },
      });
      if (disciplinaDesignacao != null) {
        return res
          .status(400)
          .json({ message: "Esta designação de disciplina já existe" });
      }

      const disciplinaDescricao = await Disciplina.findOne({
        where: { id: { [Op.ne]: req.params.id }, descricao },
      });
      if (disciplinaDescricao != null) {
        return res
          .status(400)
          .json({ message: "Esta descrição de disciplina já existe" });
      }

      const disciplinaUpdate = await Disciplina.update(
        {
          designacao,
          descricao,
          semestreId,
          grauAcademicoId,
          criadoPor,
          actualizadoPor,
        },
        { where: { id } }
      );
      return res.json({ message: "Disciplina actualizada com sucesso" });
    } catch (error) {
      res.json(error);
    }
  },

  async deleteDisciplina(req, res) {
    try {
      const { id } = req.params;
      const disciplinaDelete = await Disciplina.destroy({ where: { id } });
      if (!disciplinaDelete) {
        return res.json({ message: "Esta disciplina não existe" });
      }
      return res.json({ message: "Disciplina excluída com sucesso" });
    } catch (error) {
      res.json(error);
    }
  },
};
