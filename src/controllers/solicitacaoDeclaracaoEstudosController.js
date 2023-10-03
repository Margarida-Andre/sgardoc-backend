const SolicitacaoDeclaracaoEstudos = require("../models/SolicitacaoDeclaracaoEstudos");
const Estudante = require("../models/Estudante");
const transportador = require("../midlewares/confEnvioEmail");
const document = require("../midlewares/jsPdf");
const dotenv = require("dotenv/config.js");
const { Buffer } = require("node:buffer");

module.exports = {
  async getDeclaracoesPendentes(req, res) {
    try {
      const declaracoesPendentes = await SolicitacaoDeclaracaoEstudos.findAll({
        where: { estadoId: 1 },
        order: [["id", "DESC"]],
      });
      if (declaracoesPendentes == 0) {
        return res.status(400).json({
          message:
            "Não existe nenhuma solicitação de declaração de estudos pendente",
        });
      }
      return res.json(declaracoesPendentes);
    } catch (error) {
      res.json(error);
    }
  },

  async getDeclaracoesAprovadas(req, res) {
    try {
      const declaracoesAprovadas = await SolicitacaoDeclaracaoEstudos.findAll({
        where: { estadoId: 2 },
        order: [["id", "DESC"]],
      });
      if (declaracoesAprovadas == 0) {
        return res.status(400).json({
          message:
            "Não existe nenhuma solicitação de declaração de estudos aprovada",
        });
      }

      return res.json(declaracoesAprovadas);
    } catch (error) {
      res.json(error);
    }
  },

  async getDeclaracoesRejeitadas(req, res) {
    try {
      const declaracoesRejeitadas = await SolicitacaoDeclaracaoEstudos.findAll({
        where: { estadoId: 3 },
        order: [["id", "DESC"]],
      });
      if (declaracoesRejeitadas == 0) {
        return res.status(400).json({
          message:
            "Não existe nenhuma solicitação de declaração de estudos rejeitada",
        });
      }
      return res.json(declaracoesRejeitadas);
    } catch (error) {
      res.json(error);
    }
  },

  async getSolicitacaoDeclaracaoEstudos(req, res) {
    try {
      const solicitacaoAll = await SolicitacaoDeclaracaoEstudos.findAll({
        order: [["createdAt", "DESC"]],
      });
      if (solicitacaoAll == 0) {
        return res.status(400).json({
          message: "Não existe nenhuma solicitação de declaração de estudos",
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
        grauAcademicoId,
        estadoId,
        email,
        telefonePrincipal,
        telefoneAlternativo,
        tipoDeclaracaoId,
        duracaoDeclaracaoId,
        efeitoDeclaracaoId,
        outroEfeito,
        comprovativoPagamento,
        criadoPor,
        actualizadoPor,
      } = req.body;

      const solicitacaoCreate = await SolicitacaoDeclaracaoEstudos.create({
        estudanteId,
        grauAcademicoId,
        estadoId,
        email,
        telefonePrincipal,
        telefoneAlternativo,
        tipoDeclaracaoId,
        duracaoDeclaracaoId,
        efeitoDeclaracaoId,
        outroEfeito,
        comprovativoPagamento,
        criadoPor,
        actualizadoPor,
      });
      return res.json({
        solicitacaoCreate,
        message:
          "Solicitação de declaração de estudos feita com sucesso, um email será enviado ao destinatário após solicitação ser aprovada.",
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
        grauAcademicoId,
        estadoId,
        email,
        telefonePrincipal,
        telefoneAlternativo,
        tipoDeclaracaoId,
        duracaoDeclaracaoId,
        efeitoDeclaracaoId,
        outroEfeito,
        comprovativoPagamento,
        criadoPor,
        actualizadoPor,
      } = req.body;

      const solicitacaoInexistente =
        await SolicitacaoDeclaracaoEstudos.findByPk(id);
      if (!solicitacaoInexistente) {
        return res.status(400).json({
          message: "Esta solicitação de histórico com notas não existe",
        });
      }

      const solicitacaoUpdate = await SolicitacaoDeclaracaoEstudos.update(
        {
          estudanteId,
          grauAcademicoId,
          estadoId,
          email,
          telefonePrincipal,
          telefoneAlternativo,
          tipoDeclaracaoId,
          duracaoDeclaracaoId,
          efeitoDeclaracaoId,
          outroEfeito,
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

        const getLenghtHN = await SolicitacaoDeclaracaoEstudos.findAll();
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
            "SOLICITAÇÃO DE DECLARAÇÃO DE ESTUDOS Nº " +
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
          subject: "SOLICITAÇÃO DE DECLARAÇÃO DE ESTUDOS INSTIC 🎓",
          text:
            "Você fez uma solicitação de declaração de estudos no INSTIC" +
            "\n" +
            "Faça o carregamento do comprovativo abaixo:" +
            "\n",
          attachments: [
            {
              filename: "Declaração_de_estudos.pdf",
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
        message: "Solicitação de declaração de estudos actualizada com sucesso",
      });
    } catch (error) {
      res.json(error);
    }
  },

  async deleteSolicitacao(req, res) {
    try {
      const { id } = req.params;
      const solicitacaoDelete = await SolicitacaoDeclaracaoEstudos.destroy({
        where: { id },
      });
      if (!solicitacaoDelete) {
        return res.json({
          message: "Esta solicitação de declaração de estudos não existe",
        });
      }
      return res.json({
        message: "Solicitação de declaração de estudos excluída com sucesso",
      });
    } catch (error) {
      res.json(error);
    }
  },
};
