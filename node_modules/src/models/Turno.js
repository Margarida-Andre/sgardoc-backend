const { Model, DataTypes } = require("sequelize");

class Turno extends Model {
  static init(sequelize) {
    super.init(
      {
        designacao: DataTypes.STRING,
        criadoPor: DataTypes.STRING,
        actualizadoPor: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "turno",
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Turma, {
      foreignKey: "turnoId",
      as: "turma",
    });

    this.hasMany(models.Estudante, {
      foreignKey: "turnoId",
      as: "estudante",
    });
  }
}

module.exports = Turno;
