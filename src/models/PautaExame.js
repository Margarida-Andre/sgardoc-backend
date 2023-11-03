const { Model, DataTypes } = require("sequelize");

class PautaExame extends Model {
  static init(sequelize) {
    super.init(
      {
        nota1: DataTypes.REAL,
        nota2: DataTypes.REAL,
        notaExame: DataTypes.REAL,
        mediaFinal: DataTypes.REAL,
        professorId: DataTypes.STRING,
        estudanteId: DataTypes.UUIDV4,
        semestreId: DataTypes.INTEGER,
        disciplinaId: DataTypes.UUIDV4,
        criadoPor: DataTypes.STRING,
        actualizadoPor: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "pautaExame",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Semestre, {
      foreignKey: "semestreId",
      as: "semestre",
    });

    this.belongsTo(models.Estudante, {
      foreignKey: "estudanteId",
      as: "estudante",
    });

    this.belongsTo(models.Disciplina, {
      foreignKey: "disciplinaId",
      as: "disciplina",
    });
  }
}

module.exports = PautaExame;
