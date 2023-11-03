const { Model, DataTypes } = require("sequelize");

class Disciplina extends Model {
  static init(sequelize) {
    super.init(
      {
        designacao: DataTypes.STRING,
        descricao: DataTypes.STRING,
        semestreId: DataTypes.INTEGER,
        grauAcademicoId: DataTypes.UUIDV4,
        criadoPor: DataTypes.STRING,
        actualizadoPor: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "disciplina",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Semestre, {
      foreignKey: "semestreId",
      as: "semestre",
    });
    this.belongsTo(models.GrauAcademico, {
      foreignKey: "grauAcademicoId",
      as: "grauAcademico",
    });

    this.hasMany(models.PautaParcelar, {
      foreignKey: "disciplinaId",
      as: "pautaParcelar",
    });

    this.hasMany(models.PautaExame, {
      foreignKey: "disciplinaId",
      as: "pautaExame",
    });

    this.hasMany(models.PautaRecurso, {
      foreignKey: "disciplinaId",
      as: "pautaRecurso",
    });

    this.hasMany(models.PautaRecuperacao, {
      foreignKey: "disciplinaId",
      as: "pautaRecuperacao",
    });
  }
}

module.exports = Disciplina;
