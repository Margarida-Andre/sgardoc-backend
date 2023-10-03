const { Model, DataTypes } = require("sequelize");

class Municipio extends Model {
  static init(sequelize) {
    super.init(
      {
        provinciaId: DataTypes.INTEGER,
        designacao: DataTypes.STRING,
        criadoPor: DataTypes.STRING,
        actualizadoPor: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "municipio",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Provincia, {
      foreignKey: "provinciaId",
      as: "provincia",
    });

    this.hasMany(models.Matricula, {
      foreignKey: "municipioId",
      as: "matricula",
    });
  }
}

module.exports = Municipio;
