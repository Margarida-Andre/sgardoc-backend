const { Model, DataTypes } = require("sequelize");

class Permissao extends Model {
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
        tableName: "permissao",
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Categoria, {
      foreignKey: "permissaoId",
      through: "categoriaPermissao",
      as: "categoria",
    });
  }
}

module.exports = Permissao;
