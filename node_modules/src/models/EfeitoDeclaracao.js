const { Model, DataTypes } = require("sequelize");

class EfeitoDeclaracao extends Model {
  static init(sequelize) {
    super.init(
      {
        efeito: DataTypes.STRING,
        criadoPor: DataTypes.STRING,
        actualizadoPor: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "efeitoDeclaracao",
      }
    );
  }

  static associate(models) {
    this.hasMany(models.SolicitacaoDeclaracaoEstudos, {
      foreignKey: "efeitoDeclaracaoId",
      as: "declaracaoEstudos",
    });
  }
}

module.exports = EfeitoDeclaracao;
