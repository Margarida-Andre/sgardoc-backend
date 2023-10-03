const SolicitacaoRequerimento = require("../models/SolicitacaoRequerimento");
const Estudante = require("../models/Estudante");
const transportador = require("../midlewares/confEnvioEmail");
const dotenv = require("dotenv/config.js");

module.exports = {
  async getReqPendentes(req, res) {
    try {
      const reqPendentes = await SolicitacaoRequerimento.findAll({
        where: { estadoId: 1 },
        order: [["id", "DESC"]],
      });
      if (reqPendentes == 0) {
        return res.status(400).json({
          message: "Não existe nenhum requerimento pendente",
        });
      }
      return res.json(reqPendentes);
    } catch (error) {
      res.json(error);
    }
  },

  async getReqAprovados(req, res) {
    try {
      const reqAprovados = await SolicitacaoRequerimento.findAll({
        where: { estadoId: 2 },
        order: [["id", "DESC"]],
      });
      if (reqAprovados == 0) {
        return res.status(400).json({
          message: "Não existe nenhum requerimento aprovado",
        });
      }

      return res.json(reqAprovados);
    } catch (error) {
      res.json(error);
    }
  },

  async getReqRejeitados(req, res) {
    try {
      const reqRejeitados = await SolicitacaoRequerimento.findAll({
        where: { estadoId: 3 },
        order: [["id", "DESC"]],
      });
      if (reqRejeitados == 0) {
        return res.status(400).json({
          message: "Não existe nenhum requerimento rejeitado",
        });
      }
      return res.json(reqRejeitados);
    } catch (error) {
      res.json(error);
    }
  },

  async getSolicitacaoRequerimentos(req, res) {
    try {
      const solicitacaoAll = await SolicitacaoRequerimento.findAll({
        order: [["createdAt", "DESC"]],
      });
      if (solicitacaoAll == 0) {
        return res.status(400).json({
          message: "Não existe nenhum requerimento",
        });
      }
      return res.json(solicitacaoAll);
    } catch (error) {
      res.json(error);
    }
  },

  async createSolicitacao(req, res) {
    try {
      const {
        estudanteId,
        estadoId,
        email,
        telefonePrincipal,
        telefoneAlternativo,
        assunto,
        motivo,
        autorizacao,
        comprovativoPagamento,
        criadoPor,
        actualizadoPor,
      } = req.body;

      const solicitacaoCreate = await SolicitacaoRequerimento.create({
        estudanteId,
        estadoId,
        email,
        telefonePrincipal,
        telefoneAlternativo,
        assunto,
        motivo,
        autorizacao,
        comprovativoPagamento,
        criadoPor,
        actualizadoPor,
      });
      return res.json({
        solicitacaoCreate,
        message:
          "Requerimento feito com sucesso, um email será enviado ao destinatário após solicitação ser aprovada.",
      });
    } catch (error) {
      res.json(error);
    }
  },

  async updateSolicitacao(req, res) {
    try {
      const { id } = req.params;
      const {
        estudanteId,
        estadoId,
        email,
        telefonePrincipal,
        telefoneAlternativo,
        assunto,
        motivo,
        autorizacao,
        comprovativoPagamento,
        criadoPor,
        actualizadoPor,
      } = req.body;

      const solicitacaoInexistente = await SolicitacaoRequerimento.findByPk(id);
      if (!solicitacaoInexistente) {
        return res.status(400).json({
          message: "Esta solicitação de requerimento não existe",
        });
      }

      const solicitacaoUpdate = await SolicitacaoRequerimento.update(
        {
          estudanteId,
          estadoId,
          email,
          telefonePrincipal,
          telefoneAlternativo,
          assunto,
          motivo,
          autorizacao,
          comprovativoPagamento,
          criadoPor,
          actualizadoPor,
        },
        { where: { id } }
      );

      if (estadoId === 2) {
        const getEstudante = await Estudante.findByPk(estudanteId, {
          where: { estudanteId },
          include: [
            { association: "matricula", attributes: ["nome"] },
            { association: "grauAcademico", attributes: ["grau"] },
            { association: "curso", attributes: ["designacao"] },
            { association: "usuario", attributes: ["email"] },
          ],
        });

        const envioEmail = {
          from: process.env.EMAIL,
          to: getEstudante.usuario.email,
          subject: "ENTRADA DE REQUERIMENTO INSTIC 🎓",
          text:
            "Você deu entrada à um requerimento no INSTIC. Por favor, aguarde! Brevemente daremos um retorno." +
            "\n",
        };

        transportador.sendMail(envioEmail, (err) => {
          if (err) {
            return res.status(400).json({
              error: "Ocorreu um error ao enviar email para o estudante" + err,
            });
          }
          console.log("Email enviado com sucesso");
        });
      }
      return res.json({
        solicitacaoUpdate,
        message: "Requerimento actualizado com sucesso",
      });
    } catch (error) {
      res.json(error);
    }
  },

  async deleteSolicitacao(req, res) {
    try {
      const { id } = req.params;
      const solicitacaoDelete = await SolicitacaoRequerimento.destroy({
        where: { id },
      });
      if (!solicitacaoDelete) {
        return res.json({
          message: "Esta requerimento não existe",
        });
      }
      return res.json({
        message: "Requerimento excluído com sucesso",
      });
    } catch (error) {
      res.json(error);
    }
  },
};
