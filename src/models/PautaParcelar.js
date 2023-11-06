const { Model, DataTypes } = require("sequelize");

class PautaParcelar extends Model {
  static init(sequelize) {
    super.init(
      {
        nota1: DataTypes.REAL,
        nota2: DataTypes.REAL,
        mediaFinal: DataTypes.REAL,
        professorId: DataTypes.STRING,
        estudanteId: DataTypes.UUIDV4,
        semestreId: DataTypes.INTEGER,
        disciplinaId: DataTypes.UUIDV4,
        criadoPor: DataTypes.STRING,
        actualizadoPor: DataTypes.STRING,
        observacao: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "pautaParcelar",
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

module.exports = PautaParcelar;
