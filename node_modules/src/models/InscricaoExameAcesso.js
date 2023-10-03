const { Model, DataTypes } = require("sequelize");

class InscricaoExameAcesso extends Model {
  static init(sequelize) {
    super.init(
      {
        provinciaId: DataTypes.INTEGER,
        municipioId: DataTypes.INTEGER,
        estadoCivilId: DataTypes.INTEGER,
        generoId: DataTypes.INTEGER,
        opcao1CursoId: DataTypes.UUIDV4,
        opcao2CursoId: DataTypes.UUIDV4,
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
      },
      {
        sequelize,
        tableName: "inscricaoExameAcesso",
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

    this.belongsTo(models.Estado, {
      foreignKey: "estadoId",
      as: "estado",
    });
  }
}

module.exports = InscricaoExameAcesso;
