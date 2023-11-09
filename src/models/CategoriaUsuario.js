const { Model, DataTypes } = require("sequelize");

class CategoriaUsuario extends Model {
  static init(sequelize) {
    super.init(
      {
        usuarioId: DataTypes.UUIDV4,
        categoriaId: DataTypes.UUIDV4,
      },
      {
        sequelize,
        tableName: "usuarioCategoria",
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Usuario, {
      foreignKey: "usuarioId",
      as: "usuario",
    });

    this.hasMany(models.Categoria, {
      foreignKey: "categoriaId",
      as: "categoria",
    });
  }
}

module.exports = CategoriaUsuario;
