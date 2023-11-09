const Pauta = require("../models/PautaRecurso");
const Disciplina = require("../models/Disciplina");
const Estudante = require("../models/Estudante");

module.exports = {
  async getPautas(req, res) {
    try {
      const pauta = await Pauta.findAll({ include: { all: true } });
      if (pauta == 0) {
        return res
          .status(400)
          .json({ message: "Não existe nenhuma informação na pauta parcelar" });
      }
      return res.json(pauta);
    } catch (error) {
      res.json(error);
    }
  },

  async getPauta(req, res) {
    try {
      const { id } = req.params;
      const pauta = await Pauta.findOne({
        where: { id },
      });
      if (pauta == 0) {
        return res
          .status(400)
          .json({ message: "Não existe informação não existe" });
      }
      return res.json(pauta);
    } catch (error) {
      res.json(error);
    }
  },

  async getPautaByDisciplina(req, res) {
    try {
      const { disciplinaId } = req.params;
      const pautaDisciplina = await Disciplina.findByPk(disciplinaId, {
        include: {
          association: "pautaRecurso",
        },
      });

      if (!pautaDisciplina) {
        return res.status(400).json({ message: "Esta disciplina não existe" });
      }

      if (pautaDisciplina == 0) {
        return res.status(400).json({
          message: "Não existe nenhuma informação",
        });
      }

      return res.json(pautaDisciplina);
    } catch (error) {
      res.json(error);
    }
  },

  async getPautaByEstudante(req, res) {
    try {
      const { estudanteId } = req.params;
      const pautaEstudante = await Estudante.findByPk(estudanteId, {
        include: {
          association: "pautaRecurso",
        },
      });

      if (!pautaEstudante) {
        return res.status(400).json({ message: "Este estudante não existe" });
      }

      if (pautaEstudante == 0) {
        return res.status(400).json({
          message: "Não existe nenhuma informação",
        });
      }

      return res.json(pautaEstudante);
    } catch (error) {
      res.json(error);
    }
  },

  async createPauta(req, res) {
    try {
      const {
        notaRecurso,
        mediaFinal,
        professorId,
        estudanteId,
        semestreId,
        disciplinaId,
        criadoPor,
        actualizadoPor,
        observacao,
      } = req.body;

      const pautaCreate = await Pauta.create({
        notaRecurso,
        mediaFinal,
        professorId,
        estudanteId,
        semestreId,
        disciplinaId,
        criadoPor,
        actualizadoPor,
        observacao,
      });
      return res.json(pautaCreate);
    } catch (error) {
      res.json(error);
    }
  },

  async updatePauta(req, res) {
    try {
      const { id } = req.params;
      const {
        notaRecurso,
        mediaFinal,
        professorId,
        estudanteId,
        semestreId,
        disciplinaId,
        criadoPor,
        actualizadoPor,
        observacao,
      } = req.body;

      const pautaUpdate = await Pauta.update(
        {
          notaRecurso,
          mediaFinal,
          professorId,
          estudanteId,
          semestreId,
          disciplinaId,
          criadoPor,
          actualizadoPor,
          observacao,
        },
        { where: { id } }
      );
      return res.json({ message: "Pauta actualizada com sucesso" });
    } catch (error) {
      res.json(error);
    }
  },

  async deletePauta(req, res) {
    try {
      const { id } = req.params;
      const pautaDelete = await Pauta.destroy({ where: { id } });
      if (!pautaDelete) {
        return res.json({ message: "Esta informação não existe" });
      }
      return res.json({ message: "Item excluído com sucesso" });
    } catch (error) {
      res.json(error);
    }
  },
};
