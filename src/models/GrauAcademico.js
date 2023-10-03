const { Model, DataTypes } = require("sequelize");

class GrauAcademico extends Model {
  static init(sequelize) {
    super.init(
      {
        cursoId: DataTypes.UUIDV4,
        grau: DataTypes.INTEGER,
        descricao: DataTypes.STRING,
        criadoPor: DataTypes.STRING,
        actualizadoPor: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "grauAcademico",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Curso, {
      foreignKey: "cursoId",
      as: "curso",
    });

    this.hasMany(models.Turma, {
      foreignKey: "grauAcademicoId",
      as: "turma",
    });

    this.hasMany(models.Estudante, {
      foreignKey: "grauAcademicoId",
      as: "estudante",
    });

    this.hasMany(models.SolicitacaoDeclaracaoEstudos, {
      foreignKey: "grauAcademicoId",
      as: "solicitacaoDeclaracaoEstudos",
    });
  }
}

module.exports = GrauAcademico;
