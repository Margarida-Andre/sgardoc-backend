const { Model, DataTypes } = require("sequelize");

class Curso extends Model {
  static init(sequelize) {
    super.init(
      {
        designacao: DataTypes.STRING,
        criadoPor: DataTypes.STRING,
        actualizadoPor: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "curso",
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Matricula, {
      foreignKey: "cursoId",
      as: "matricula",
    });

    this.hasMany(models.GrauAcademico, {
      foreignKey: "cursoId",
      as: "grauAcademico",
    });

    this.hasMany(models.Turma, {
      foreignKey: "cursoId",
      as: "turma",
    });

    this.hasMany(models.Estudante, {
      foreignKey: "cursoId",
      as: "estudante",
    });
  }
}

module.exports = Curso;
