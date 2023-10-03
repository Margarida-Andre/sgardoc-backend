const { Model, DataTypes } = require("sequelize");

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        numeroProcesso: DataTypes.INTEGER,
        senha: DataTypes.STRING,
        criadoPor: DataTypes.STRING,
        actualizadoPor: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "usuario",
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Categoria, {
      foreignKey: "usuarioId",
      through: "usuarioCategoria",
      as: "categoria",
    });

    this.hasMany(models.Estudante, {
      foreignKey: "usuarioId",
      as: "estudante",
    });
  }
}

module.exports = Usuario;
