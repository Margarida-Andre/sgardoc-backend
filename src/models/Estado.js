const { Model, DataTypes } = require("sequelize");

class Estado extends Model {
  static init(sequelize) {
    super.init(
      {
        designacao: DataTypes.STRING,
        criadoPor: DataTypes.STRING,
        actualizadoPor: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "estado",
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Matricula, {
      foreignKey: "estadoId",
      as: "matricula",
    });

    this.hasMany(models.SolicitacaoHistoricoNotas, {
      foreignKey: "estadoId",
      as: "solicitacaoHistoricoNotas",
    });

    this.hasMany(models.SolicitacaoRequerimento, {
      foreignKey: "estadoId",
      as: "solicitacaoRequerimento",
    });

    this.hasMany(models.SolicitacaoDeclaracaoEstudos, {
      foreignKey: "estadoId",
      as: "solicitacaoDeclaracaoEstudos",
    });
  }
}

module.exports = Estado;
