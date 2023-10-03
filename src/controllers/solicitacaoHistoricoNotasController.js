const SolicitacaoHistoricoNotas = require("../models/SolicitacaoHistoricoNotas");
const Estudante = require("../models/Estudante");
const transportador = require("../midlewares/confEnvioEmail");
const document = require("../midlewares/jsPdf");
const dotenv = require("dotenv/config.js");
const { Buffer } = require("node:buffer");

module.exports = {
  async getHNPendentes(req, res) {
    try {
      const hnPendentes = await SolicitacaoHistoricoNotas.findAll({
        where: { estadoId: 1 },
        order: [["id", "DESC"]],
      });
      if (hnPendentes == 0) {
        return res.status(400).json({
          message:
            "Não existe nenhuma solicitação de histórico com notas pendente",
        });
      }
      return res.json(hnPendentes);
    } catch (error) {
      res.json(error);
    }
  },

  async getHNAprovadas(req, res) {
    try {
      const hnAprovadas = await SolicitacaoHistoricoNotas.findAll({
        where: { estadoId: 2 },
        order: [["id", "DESC"]],
      });
      if (hnAprovadas == 0) {
        return res.status(400).json({
          message:
            "Não existe nenhuma solicitação de histórico com notas aprovada",
        });
      }

      return res.json(hnAprovadas);
    } catch (error) {
      res.json(error);
    }
  },

  async getHNRejeitadas(req, res) {
    try {
      const hnRejeitadas = await SolicitacaoHistoricoNotas.findAll({
        where: { estadoId: 3 },
        order: [["id", "DESC"]],
      });
      if (hnRejeitadas == 0) {
        return res.status(400).json({
          message:
            "Não existe nenhuma solicitação de histórico com notas rejeitada",
        });
      }
      return res.json(hnRejeitadas);
    } catch (error) {
      res.json(error);
    }
  },

  async getSolicitacaoHistoricoNotas(req, res) {
    try {
      const solicitacaoAll = await SolicitacaoHistoricoNotas.findAll({
        order: [["createdAt", "DESC"]],
      });
      if (solicitacaoAll == 0) {
        return res.status(400).json({
          message: "Não existe nenhuma solicitação de histórico com notas",
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
        inicioPlano,
        fimPlano,
        comprovativoPagamento,
        criadoPor,
        actualizadoPor,
      } = req.body;

      const solicitacaoCreate = await SolicitacaoHistoricoNotas.create({
        estudanteId,
        estadoId,
        email,
        telefonePrincipal,
        telefoneAlternativo,
        inicioPlano,
        fimPlano,
        comprovativoPagamento,
        criadoPor,
        actualizadoPor,
      });
      return res.json({
        solicitacaoCreate,
        message:
          "Solicitação de histórico com notas feita com sucesso, um email será enviado ao destinatário após solicitação ser aprovada.",
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
        inicioPlano,
        fimPlano,
        comprovativoPagamento,
        criadoPor,
        actualizadoPor,
      } = req.body;

      const solicitacaoInexistente = await SolicitacaoHistoricoNotas.findByPk(
        id
      );
      if (!solicitacaoInexistente) {
        return res.status(400).json({
          message: "Esta solicitação de histórico com notas não existe",
        });
      }

      const solicitacaoUpdate = await SolicitacaoHistoricoNotas.update(
        {
          estudanteId,
          estadoId,
          email,
          telefonePrincipal,
          telefoneAlternativo,
          inicioPlano,
          fimPlano,
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

        const getLenghtHN = await SolicitacaoHistoricoNotas.findAll();
        let date_ob = new Date();

        document.rect(25, 30, 170, 45);
        document.setFontSize(13);
        document.text(
          30,
          20,
          "\n" +
            "INSTITUTO DE TECNOLOGIAS DE INFORMAÇÃO E COMUNICAÇÃO" +
            "\n" +
            "\n" +
            "SOLICITAÇÃO DE PLANO CURRICULAR Nº " +
            (getLenghtHN.length + 1) +
            "\n" +
            "Nome: " +
            getEstudante.matricula.nome +
            "\n" +
            "Curso: " +
            getEstudante.curso.designacao +
            "\n" +
            "Processo: " +
            getEstudante.numeroProcesso +
            "\n" +
            "Ano: " +
            getEstudante.grauAcademico.grau +
            "º" +
            "\n" +
            "Data: " +
            date_ob.getDate() +
            "/" +
            (date_ob.getMonth() + 1) +
            "/" +
            date_ob.getFullYear() +
            "\n" +
            "Funcionário: " +
            criadoPor
        );
        document.setFontSize(13);

        const envioEmail = {
          from: process.env.EMAIL,
          to: getEstudante.usuario.email,
          subject: "SOLICITAÇÃO DE PLANO CURRICULAR INSTIC 🎓",
          text:
            "Você fez uma solicitação de histórico com notas no INSTIC" +
            "\n" +
            "Faça o carregamento do comprovativo abaixo:" +
            "\n",
          attachments: [
            {
              filename: "Histórico_Com_Notas.pdf",
              content: Buffer.from(document.output("arraybuffer")),
            },
          ],
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
        message: "Solicitação de histórico com notas actualizada com sucesso",
      });
    } catch (error) {
      res.json(error);
    }
  },

  async deleteSolicitacao(req, res) {
    try {
      const { id } = req.params;
      const solicitacaoDelete = await SolicitacaoHistoricoNotas.destroy({
        where: { id },
      });
      if (!solicitacaoDelete) {
        return res.json({
          message: "Esta solicitação de histórico com notas não existe",
        });
      }
      return res.json({
        message: "Solicitação de histórico com notas excluída com sucesso",
      });
    } catch (error) {
      res.json(error);
    }
  },
};
