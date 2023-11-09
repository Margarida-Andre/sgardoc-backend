const Inscricao = require("../models/InscricaoExameAcesso");
const { Op } = require("@sequelize/core");
const transportador = require("../midlewares/confEnvioEmail");
const document = require("../midlewares/jsPdf");
const dotenv = require("dotenv/config.js");
const { Buffer } = require("node:buffer");

module.exports = {
  async getInscricoesPendentes(req, res) {
    try {
      const inscricoesPendentes = await Inscricao.findAll({
        where: { estadoId: 1 },
        order: [["createdAt", "DESC"]],
        include: { all: true },
      });

      return res.json(inscricoesPendentes);
    } catch (error) {
      res.json(error);
    }
  },

  async getInscricoesAprovadas(req, res) {
    try {
      const inscricoesAprovadas = await Inscricao.findAll({
        where: { estadoId: 2 },
        order: [["createdAt", "DESC"]],
        include: { all: true },
      });

      return res.json(inscricoesAprovadas);
    } catch (error) {
      res.json(error);
    }
  },

  async getInscricoesRejeitadas(req, res) {
    try {
      const inscricoesRejeitadas = await Inscricao.findAll({
        where: { estadoId: 3 },
        order: [["createdAt", "DESC"]],
        include: { all: true },
      });

      return res.json(inscricoesRejeitadas);
    } catch (error) {
      res.json(error);
    }
  },

  async getInscricoes(req, res) {
    try {
      const inscricaoAll = await Inscricao.findAll({
        order: [["createdAt", "DESC"]],
        include: { all: true },
      });
      if (inscricaoAll == 0) {
        return res
          .status(400)
          .json({ message: "Não existe nenhuma inscrição de exame de acesso" });
      }
      return res.json(inscricaoAll);
    } catch (error) {
      res.json(error);
    }
  },

  async getInscricao(req, res) {
    try {
      const { id } = req.params;
      const inscricao = await Inscricao.findOne({
        where: { id },
      });
      if (inscricao == 0) {
        return res.status(400).json({ message: "Esta inscrição não existe" });
      }
      return res.json(inscricao);
    } catch (error) {
      res.json(error);
    }
  },

  async createInscricao(req, res) {
    try {
      const {
        provinciaId,
        municipioId,
        estadoCivilId,
        generoId,
        opcao1CursoId,
        opcao2CursoId,
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

      const contactoEmail = await Inscricao.findOne({
        where: { email },
      });
      if (contactoEmail != null) {
        return res.status(400).json({ message: "Este email já existe" });
      }

      const numeroBI = await Inscricao.findOne({
        where: { numeroBi },
      });
      if (numeroBI != null) {
        return res
          .status(400)
          .json({ message: "Este número do Bilhete de Identidade já existe" });
      }

      const contactoPrincipal = await Inscricao.findOne({
        where: { telefonePrincipal },
      });
      if (contactoPrincipal != null) {
        return res
          .status(400)
          .json({ message: "O número de telefone principal já existe" });
      }

      const contactoAlternativo = await Inscricao.findOne({
        where: { telefoneAlternativo },
      });
      if (contactoAlternativo != null) {
        return res
          .status(400)
          .json({ message: "O número de telefone alternativo já existe" });
      }

      const inscricaoCreate = await Inscricao.create({
        provinciaId,
        municipioId,
        estadoCivilId,
        generoId,
        opcao1CursoId,
        opcao2CursoId,
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

      const getInscricao = await Inscricao.findByPk(inscricaoCreate.id, {
        where: inscricaoCreate.id,
        include: [{ association: "curso", attributes: ["designacao"] }],
      });
      const getLenghtInscricao = await Inscricao.findAll();

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
          "INSCRIÇÃO DE EXAME DE ACCESSO Nº " +
          (getLenghtInscricao.length + 1) +
          "\n" +
          "Nome: " +
          nome +
          "\n" +
          "Opção do curso 1: " +
          getInscricao.curso.designacao +
          "\n" +
          "Opção do curso 2: " +
          getInscricao.curso.designacao +
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
        to: email,
        subject: "SOLICITAÇÃO DE PLANO CURRICULAR INSTIC 🎓",
        text:
          "Parabéns, você acabou de inscrever-se no INSTIC" +
          "\n" +
          "Reserve seu código da inscrição caso necessite efectuar uma matrícula: " +
          inscricaoCreate.id +
          "\n" +
          "Faça o carregamento do comprovativo abaixo:" +
          "\n",

        attachments: [
          {
            filename: "Inscrição_de_Exame_de_Acesso.pdf",
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

      return res.json({
        inscricaoCreate,
        message: "Inscrição feita com sucesso",
      });
    } catch (error) {
      res.json(error);
    }
  },

  async updateInscricao(req, res) {
    try {
      const { id } = req.params;
      const {
        provinciaId,
        municipioId,
        estadoCivilId,
        generoId,
        opcao1CursoId,
        opcao2CursoId,
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

      const contactoEmail = await Inscricao.findOne({
        where: { id: { [Op.ne]: req.params.id }, email },
      });
      if (contactoEmail != null) {
        return res.status(400).json({ message: "Este email já existe" });
      }

      const numeroBI = await Inscricao.findOne({
        where: { id: { [Op.ne]: req.params.id }, numeroBi },
      });
      if (numeroBI != null) {
        return res
          .status(400)
          .json({ message: "Este número do Bilhete de Identidade já existe" });
      }

      const contactoPrincipal = await Inscricao.findOne({
        where: { id: { [Op.ne]: req.params.id }, telefonePrincipal },
      });
      if (contactoPrincipal != null) {
        return res
          .status(400)
          .json({ message: "O número de telefone principal já existe" });
      }

      const contactoAlternativo = await Inscricao.findOne({
        where: { id: { [Op.ne]: req.params.id }, telefoneAlternativo },
      });
      if (contactoAlternativo != null) {
        return res
          .status(400)
          .json({ message: "O número de telefone alternativo já existe" });
      }

      const inscricaoUpdate = await Inscricao.update(
        {
          provinciaId,
          municipioId,
          estadoCivilId,
          generoId,
          opcao1CursoId,
          opcao2CursoId,
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
        inscricaoUpdate,
        message: "Inscrição actualizada com sucesso",
      });
    } catch (error) {
      res.json(error);
    }
  },

  async deleteInscricao(req, res) {
    try {
      const { id } = req.params;
      const inscricaoDelete = await Inscricao.destroy({
        where: { id },
      });
      if (!inscricaoDelete) {
        return res.json({ message: "Esta inscrição não existe" });
      }
      return res.json({ message: "Inscrição excluída com sucesso" });
    } catch (error) {
      res.json(error);
    }
  },
};
