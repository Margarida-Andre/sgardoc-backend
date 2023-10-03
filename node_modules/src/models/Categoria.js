const { Model, DataTypes } = require("sequelize");

class Categoria extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        descricao: DataTypes.STRING,
        criadoPor: DataTypes.STRING,
        actualizadoPor: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "categoria",
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Usuario, {
      foreignKey: "categoriaId",
      through: "usuarioCategoria",
      as: "usuario",
    });

    this.belongsToMany(models.Permissao, {
      foreignKey: "categoriaId",
      through: "categoriaPermissao",
      as: "permissao",
    });
  }
}

module.exports = Categoria;
