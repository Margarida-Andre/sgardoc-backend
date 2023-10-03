const { Model, DataTypes } = require("sequelize");

class SolicitacaoHistoricoNotas extends Model {
  static init(sequelize) {
    super.init(
      {
        estudanteId: DataTypes.UUIDV4,
        estadoId: DataTypes.INTEGER,
        email: DataTypes.STRING,
        telefonePrincipal: DataTypes.INTEGER,
        telefoneAlternativo: DataTypes.INTEGER,
        inicioPlano: DataTypes.INTEGER,
        fimPlano: DataTypes.INTEGER,
        comprovativoPagamento: DataTypes.STRING,
        criadoPor: DataTypes.STRING,
        actualizadoPor: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "solicitacaoHistoricoNotas",
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
  }
}

module.exports = SolicitacaoHistoricoNotas;
