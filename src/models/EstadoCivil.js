const { Model, DataTypes } = require("sequelize");

class EstadoCivil extends Model {
  static init(sequelize) {
    super.init(
      {
        designacao: DataTypes.STRING,
        criadoPor: DataTypes.STRING,
        actualizadoPor: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "estadoCivil",
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Matricula, {
      foreignKey: "estadoCivilId",
      as: "matricula",
    });
  }
}

module.exports = EstadoCivil;
