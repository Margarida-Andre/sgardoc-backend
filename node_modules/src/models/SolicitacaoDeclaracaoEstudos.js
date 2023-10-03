const { Model, DataTypes } = require("sequelize");

class SolicitacaoDeclaracaoEstudos extends Model {
  static init(sequelize) {
    super.init(
      {
        estudanteId: DataTypes.UUIDV4,
        grauAcademicoId: DataTypes.UUIDV4,
        estadoId: DataTypes.INTEGER,
        email: DataTypes.STRING,
        telefonePrincipal: DataTypes.INTEGER,
        telefoneAlternativo: DataTypes.INTEGER,
        tipoDeclaracaoId: DataTypes.INTEGER,
        duracaoDeclaracaoId: DataTypes.INTEGER,
        efeitoDeclaracaoId: DataTypes.INTEGER,
        outroEfeito: DataTypes.STRING,
        comprovativoPagamento: DataTypes.STRING,
        criadoPor: DataTypes.STRING,
        actualizadoPor: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "solicitacaoDeclaracaoEstudos",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Estado, {
      foreignKey: "estadoId",
      as: "estado",
    });

    this.belongsTo(models.Estudante, {
      foreignKey: "estudanteId",
      as: "estudante",
    });

    this.belongsTo(models.TipoDeclaracao, {
      foreignKey: "tipoDeclaracaoId",
      as: "tipoDeclaracao",
    });

    this.belongsTo(models.DuracaoDeclaracao, {
      foreignKey: "duracaoDeclaracaoId",
      as: "duracaoDeclaracao",
    });

    this.belongsTo(models.EfeitoDeclaracao, {
      foreignKey: "efeitoDeclaracaoId",
      as: "efeitoDeclaracao",
    });
  }
}

module.exports = SolicitacaoDeclaracaoEstudos;
