const { Model, DataTypes } = require("sequelize");

class Matricula extends Model {
  static init(sequelize) {
    super.init(
      {
        inscricaoExameAcessoId: DataTypes.UUIDV4,
        provinciaId: DataTypes.INTEGER,
        municipioId: DataTypes.INTEGER,
        estadoCivilId: DataTypes.INTEGER,
        generoId: DataTypes.INTEGER,
        cursoId: DataTypes.UUIDV4,
        estadoId: DataTypes.INTEGER,
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        dataNascimento: DataTypes.DATE,
        numeroBi: DataTypes.STRING,
        dataEmissaoBi: DataTypes.DATE,
        validadeBi: DataTypes.DATE,
        arquivoIdentificacao: DataTypes.STRING,
        carregamentoBi: DataTypes.STRING,
        certificadoEnsinoMedio: DataTypes.STRING,
        carregamentoFotografia: DataTypes.STRING,
        comprovativoPagamento: DataTypes.STRING,
        telefonePrincipal: DataTypes.INTEGER,
        telefoneAlternativo: DataTypes.INTEGER,
        nomePai: DataTypes.STRING,
        nomeMae: DataTypes.STRING,
        criadoPor: DataTypes.STRING,
        actualizadoPor: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        sequelize,
        tableName: "matricula",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Provincia, {
      foreignKey: "provinciaId",
      as: "provincia",
    });

    this.belongsTo(models.Municipio, {
      foreignKey: "municipioId",
      as: "municipio",
    });

    this.belongsTo(models.EstadoCivil, {
      foreignKey: "estadoCivilId",
      as: "estadoCivil",
    });

    this.belongsTo(models.Genero, {
      foreignKey: "generoId",
      as: "genero",
    });

    this.belongsTo(models.Curso, {
      foreignKey: "cursoId",
      as: "curso",
    });

    this.belongsTo(models.Estado, {
      foreignKey: "estadoId",
      as: "estado",
    });

    this.belongsTo(models.InscricaoExameAcesso, {
      foreignKey: "inscricaoExameAcessoId",
      as: "inscricaoExameAcesso",
    });

    this.hasMany(models.Estudante, {
      foreignKey: "matriculaId",
      as: "estudante",
    });
  }
}

module.exports = Matricula;
