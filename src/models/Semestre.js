const { Model, DataTypes } = require("sequelize");

class Semestre extends Model {
  static init(sequelize) {
    super.init(
      {
        designacao: DataTypes.STRING,
        descricao: DataTypes.STRING,
        criadoPor: DataTypes.STRING,
        actualizadoPor: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "semestre",
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Disciplina, {
      foreignKey: "semestreId",
      as: "disciplina",
    });

    this.hasMany(models.PautaParcelar, {
      foreignKey: "semestreId",
      as: "pautaParcelar",
    });

    this.hasMany(models.PautaExame, {
      foreignKey: "semestreId",
      as: "pautaExame",
    });

    this.hasMany(models.PautaRecurso, {
      foreignKey: "semestreId",
      as: "pautaRecurso",
    });

    this.hasMany(models.PautaRecuperacao, {
      foreignKey: "semestreId",
      as: "pautaExameEspecial",
    });
  }
}

module.exports = Semestre;
