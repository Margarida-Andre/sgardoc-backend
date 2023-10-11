const Estudante = require("../models/Estudante");
const Usuario = require("../models/Usuario");
const Matricula = require("../models/Matricula");
const transportador = require("../midlewares/confEnvioEmail");
const { Op } = require("@sequelize/core");
const dotenv = require("dotenv/config.js");
const document = require("../midlewares/jsPdf");

module.exports = {
  async getEstudantes(req, res) {
    try {
      const estudante = await Estudante.findAll({
        order: [["createdAt", "DESC"]],
      });
      if (!estudante) {
        return res.json({ message: "Não existe nenhum estudante na lista" });
      }
      return res.json(estudante);
    } catch (error) {
      res.json(error);
    }
  },

  async createEstudante(req, res) {
    try {
      const { matriculaId } = req.params;
      const {
        usuarioId,
        cursoId,
        grauAcademicoId,
        turmaId,
        turnoId,
        numeroProcesso,
        descricao,
        criadoPor,
        actualizadoPor,
      } = req.body;

      const numProcesso = await Estudante.findOne({
        where: { numeroProcesso },
      });
      if (numProcesso != null) {
        return res
          .status(400)
          .json({ message: "Este número de processo já existe" });
      }

      const getUsuario = await Usuario.findByPk(usuarioId, {
        where: { usuarioId },
        include: [
          {
            association: "estudante",
          },
        ],
      });

      const estudanteCreate = await Estudante.create({
        matriculaId,
        usuarioId,
        cursoId,
        grauAcademicoId,
        turmaId,
        turnoId,
        numeroProcesso,
        descricao,
        criadoPor,
        actualizadoPor,
      });

      const getMatricula = await Estudante.findByPk(matriculaId, {
        where: { matriculaId },
        include: [
          { association: "grauAcademico", attributes: ["grau"] },
          { association: "matricula", attributes: ["nome"] },
        ],
      });

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
          "FICHA DE MATRÍCULA Nº " +
          (this.getEstudantes + 1) +
          "\n" +
          "Nome: " +
          getMatricula.matricula.nome +
          "\n" +
          "Curso: " +
          getMatricula.curso.designacao +
          "\n" +
          "Processo: " +
          numeroProcesso +
          "\n" +
          "Ano: " +
          getMatricula.grauAcademico.grau +
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
        to: getUsuario.email,
        subject: "BEM-VINDO AO INSTIC 🎓",
        text:
          "Parabéns, você acaba de ser matriculado, agora é um estudante do Instituto de Tecnologias de Informação e Comunicação, seu número de processo é: " +
          numeroProcesso +
          "." +
          "\n" +
          "Use suas credencias para usufrir do nosso Sistema Gestão Acadêmica e Requisição de Documentos do INSTIC. " +
          "\n" +
          "Email: " +
          getUsuario.email +
          "\n" +
          "Senha: " +
          "use seu número do bilhete de identidade",
        attachments: [
          {
            filename: "Ficha_de_matrícula.pdf",
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
        estudanteCreate,
        message:
          "Estudante criado com sucesso, um email como comprovativo foi enviado para o destinatário.",
      });
    } catch (error) {
      return res.json(error);
    }
  },

  async updateEstudante(req, res) {
    try {
      const { id } = req.params;
      const {
        matriculaId,
        usuarioId,
        cursoId,
        grauAcademicoId,
        turmaId,
        turnoId,
        numeroProcesso,
        descricao,
        criadoPor,
        actualizadoPor,
      } = req.body;

      const numProcesso = await Estudante.findOne({
        where: { id: { [Op.ne]: req.params.id }, numeroProcesso },
      });
      if (numProcesso != null) {
        return res
          .status(400)
          .json({ message: "Este número de processo já existe" });
      }

      const estudanteUpdate = await Estudante.update(
        {
          matriculaId,
          usuarioId,
          cursoId,
          grauAcademicoId,
          turmaId,
          turnoId,
          numeroProcesso,
          descricao,
          criadoPor,
          actualizadoPor,
        },
        { where: { id } }
      );

      return res.json({
        estudanteUpdate,
        message: "Estudante actualizado (a) com sucesso",
      });
    } catch (error) {
      res.json(error);
    }
  },

  async deleteEstudante(req, res) {
    try {
      const { id } = req.params;
      const estudanteDelete = await Estudante.destroy({ where: { id } });
      if (!estudanteDelete) {
        return res.json({ message: "Este estudante não existe" });
      }
      return res.json({ message: "Estudante excluído com sucesso" });
    } catch (error) {
      res.json(error);
    }
  },
};
