const { Model, DataTypes } = require("sequelize");

class DuracaoDeclaracao extends Model {
  static init(sequelize) {
    super.init(
      {
        duracao: DataTypes.STRING,
        criadoPor: DataTypes.STRING,
        actualizadoPor: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "duracaoDeclaracao",
      }
    );
  }

  static associate(models) {
    this.hasMany(models.SolicitacaoDeclaracaoEstudos, {
      foreignKey: "duracaoDeclaracaoId",
      as: "declaracaoEstudos",
    });
  }
}

module.exports = DuracaoDeclaracao;
