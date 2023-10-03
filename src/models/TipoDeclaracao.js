const { Model, DataTypes } = require("sequelize");

class TipoDeclaracao extends Model {
  static init(sequelize) {
    super.init(
      {
        tipo: DataTypes.STRING,
        criadoPor: DataTypes.STRING,
        actualizadoPor: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "tipoDeclaracao",
      }
    );
  }

  static associate(models) {
    this.hasMany(models.SolicitacaoDeclaracaoEstudos, {
      foreignKey: "tipoDeclaracaoId",
      as: "declaracaoEstudos",
    });
  }
}

module.exports = TipoDeclaracao;
