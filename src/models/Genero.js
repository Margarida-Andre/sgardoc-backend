const { Model, DataTypes } = require("sequelize");

class Genero extends Model {
  static init(sequelize) {
    super.init(
      {
        designacao: DataTypes.STRING,
        criadoPor: DataTypes.STRING,
        actualizadoPor: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "genero",
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Matricula, {
      foreignKey: "generoId",
      as: "matricula",
    });
  }
}

module.exports = Genero;
