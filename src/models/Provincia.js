const { Model, DataTypes } = require("sequelize");

class Provincia extends Model {
  static init(sequelize) {
    super.init(
      {
        designacao: DataTypes.STRING,
        criadoPor: DataTypes.STRING,
        actualizadoPor: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "provincia",
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Municipio, {
      foreignKey: "provinciaId",
      as: "municipio",
    });

    this.hasMany(models.Matricula, {
      foreignKey: "provinciaId",
      as: "matricula",
    });
  }
}

module.exports = Provincia;
