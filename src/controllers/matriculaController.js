const Matricula = require("../models/Matricula");
const { Op } = require("@sequelize/core");

module.exports = {
  async getMatriculasPendentes(req, res) {
    try {
      const matriculasPendentes = await Matricula.findAll({
        where: { estadoId: 1 },
        order: [["createdAt", "DESC"]],
      });

      return res.json(matriculasPendentes);
    } catch (error) {
      res.json(error);
    }
  },

  async getMatriculasAprovadas(req, res) {
    try {
      const matriculasAprovadas = await Matricula.findAll({
        where: { estadoId: 2 },
        order: [["createdAt", "DESC"]],
      });

      return res.json(matriculasAprovadas);
    } catch (error) {
      res.json(error);
    }
  },

  async getMatriculasRejeitadas(req, res) {
    try {
      const matriculasRejeitadas = await Matricula.findAll({
        where: { estadoId: 3 },
        order: [["createdAt", "DESC"]],
      });

      return res.json(matriculasRejeitadas);
    } catch (error) {
      res.json(error);
    }
  },

  async getMatriculas(req, res) {
    try {
      const matriculaAll = await Matricula.findAll({
        order: [["createdAt", "DESC"]],
      });
      if (matriculaAll == 0) {
        return res
          .status(400)
          .json({ message: "Não existe nenhuma matrícula" });
      }
      return res.json(matriculaAll);
    } catch (error) {
      res.json(error);
    }
  },

  async getMatricula(req, res) {
    try {
      const { id } = req.params;
      const matricula = await Usuario.findOne({
        where: { id },
      });
      if (matricula == 0) {
        return res.status(400).json({ message: "Esta matrícula não existe" });
      }
      return res.json(matricula);
    } catch (error) {
      res.json(error);
    }
  },

  async createMatricula(req, res) {
    try {
      const { inscricaoExameAcessoId } = req.params;
      const {
        provinciaId,
        municipioId,
        estadoCivilId,
        generoId,
        cursoId,
        estadoId,
        nome,
        email,
        dataNascimento,
        numeroBi,
        dataEmissaoBi,
        validadeBi,
        arquivoIdentificacao,
        carregamentoBi,
        certificadoEnsinoMedio,
        carregamentoFotografia,
        comprovativoPagamento,
        telefonePrincipal,
        telefoneAlternativo,
        nomePai,
        nomeMae,
        criadoPor,
        actualizadoPor,
      } = req.body;

      const contactoEmail = await Matricula.findOne({
        where: { email },
      });
      if (contactoEmail != null) {
        return res.status(400).json({ message: "Este email já existe" });
      }

      const numeroBI = await Matricula.findOne({
        where: { numeroBi },
      });
      if (numeroBI != null) {
        return res
          .status(400)
          .json({ message: "Este número do Bilhete de Identidade já existe" });
      }

      const contactoPrincipal = await Matricula.findOne({
        where: { telefonePrincipal },
      });
      if (contactoPrincipal != null) {
        return res
          .status(400)
          .json({ message: "O número de telefone principal já existe" });
      }

      const contactoAlternativo = await Matricula.findOne({
        where: { telefoneAlternativo },
      });
      if (contactoAlternativo != null) {
        return res
          .status(400)
          .json({ message: "O número de telefone alternativo já existe" });
      }

      const matriculaCreate = await Matricula.create({
        inscricaoExameAcessoId,
        provinciaId,
        municipioId,
        estadoCivilId,
        generoId,
        cursoId,
        estadoId,
        nome,
        email,
        dataNascimento,
        numeroBi,
        dataEmissaoBi,
        validadeBi,
        arquivoIdentificacao,
        carregamentoBi,
        certificadoEnsinoMedio,
        carregamentoFotografia,
        comprovativoPagamento,
        telefonePrincipal,
        telefoneAlternativo,
        nomePai,
        nomeMae,
        criadoPor,
        actualizadoPor,
      });
      return res.json({
        matriculaCreate,
        message: "Matrícula feita com sucesso",
      });
    } catch (error) {
      res.json(error);
    }
  },

  async updateMatricula(req, res) {
    try {
      const { id } = req.params;
      const {
        inscricaoId,
        provinciaId,
        municipioId,
        estadoCivilId,
        generoId,
        cursoId,
        estadoId,
        nome,
        email,
        dataNascimento,
        numeroBi,
        dataEmissaoBi,
        validadeBi,
        arquivoIdentificacao,
        carregamentoBi,
        certificadoEnsinoMedio,
        carregamentoFotografia,
        comprovativoPagamento,
        telefonePrincipal,
        telefoneAlternativo,
        nomePai,
        nomeMae,
        criadoPor,
        actualizadoPor,
      } = req.body;

      const matriculaInexistente = await Matricula.findByPk(id);
      if (!matriculaInexistente) {
        return res.status(400).json({ message: "Esta matrícula não existe" });
      }

      const contactoEmail = await Matricula.findOne({
        where: { id: { [Op.ne]: req.params.id }, email },
      });
      if (contactoEmail != null) {
        return res.status(400).json({ message: "Este email já existe" });
      }

      const numeroBI = await Matricula.findOne({
        where: { id: { [Op.ne]: req.params.id }, numeroBi },
      });
      if (numeroBI != null) {
        return res
          .status(400)
          .json({ message: "Este número do Bilhete de Identidade já existe" });
      }

      const contactoPrincipal = await Matricula.findOne({
        where: { id: { [Op.ne]: req.params.id }, telefonePrincipal },
      });
      if (contactoPrincipal != null) {
        return res
          .status(400)
          .json({ message: "O número de telefone principal já existe" });
      }

      const contactoAlternativo = await Matricula.findOne({
        where: { id: { [Op.ne]: req.params.id }, telefoneAlternativo },
      });
      if (contactoAlternativo != null) {
        return res
          .status(400)
          .json({ message: "O número de telefone alternativo já existe" });
      }

      const matriculaUpdate = await Matricula.update(
        {
          inscricaoId,
          provinciaId,
          municipioId,
          estadoCivilId,
          generoId,
          cursoId,
          estadoId,
          nome,
          email,
          dataNascimento,
          numeroBi,
          dataEmissaoBi,
          validadeBi,
          arquivoIdentificacao,
          carregamentoBi,
          certificadoEnsinoMedio,
          carregamentoFotografia,
          comprovativoPagamento,
          telefonePrincipal,
          telefoneAlternativo,
          nomePai,
          nomeMae,
          criadoPor,
          actualizadoPor,
        },
        { where: { id } }
      );

      return res.json({
        matriculaUpdate,
        message: "Matrícula actualizada com sucesso",
      });
    } catch (error) {
      res.json(error);
    }
  },

  async deleteMatricula(req, res) {
    try {
      const { id } = req.params;
      const matriculaDelete = await Matricula.destroy({ where: { id } });
      if (!matriculaDelete) {
        return res.json({ message: "Esta matricula não existe" });
      }
      return res.json({ message: "Matrícula excluída com sucesso" });
    } catch (error) {
      res.json(error);
    }
  },
};
