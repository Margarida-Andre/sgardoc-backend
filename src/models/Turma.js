const { Model, DataTypes } = require("sequelize");

class Turma extends Model {
  static init(sequelize) {
    super.init(
      {
        cursoId: DataTypes.UUIDV4,
        grauAcademicoId: DataTypes.UUIDV4,
        turnoId: DataTypes.INTEGER,
        designacao: DataTypes.STRING,
        descricao: DataTypes.STRING,
        inicioAnoLectivo: DataTypes.DATE,
        finalAnoLectivo: DataTypes.DATE,
        criadoPor: DataTypes.STRING,
        actualizadoPor: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "turma",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Curso, {
      foreignKey: "cursoId",
      as: "curso",
    });

    this.belongsTo(models.GrauAcademico, {
      foreignKey: "grauAcademicoId",
      as: "grauAcademico",
    });

    this.belongsTo(models.Turno, {
      foreignKey: "turnoId",
      as: "turno",
    });

    this.hasMany(models.Estudante, {
      foreignKey: "turmaId",
      as: "estudante",
    });
  }
}

module.exports = Turma;
