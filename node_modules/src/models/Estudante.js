const { Model, DataTypes } = require("sequelize");

class Estudante extends Model {
  static init(sequelize) {
    super.init(
      {
        matriculaId: DataTypes.UUIDV4,
        usuarioId: DataTypes.UUIDV4,
        cursoId: DataTypes.UUIDV4,
        grauAcademicoId: DataTypes.UUIDV4,
        turmaId: DataTypes.UUIDV4,
        turnoId: DataTypes.UUIDV4,
        numeroProcesso: DataTypes.INTEGER,
        descricao: DataTypes.STRING,
        criadoPor: DataTypes.STRING,
        actualizadoPor: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "estudante",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Matricula, {
      foreignKey: "matriculaId",
      as: "matricula",
    });

    this.belongsTo(models.Usuario, {
      foreignKey: "usuarioId",
      as: "usuario",
    });

    this.belongsTo(models.Curso, {
      foreignKey: "cursoId",
      as: "curso",
    });

    this.belongsTo(models.GrauAcademico, {
      foreignKey: "grauAcademicoId",
      as: "grauAcademico",
    });

    this.belongsTo(models.Turma, {
      foreignKey: "turmaId",
      as: "turma",
    });

    this.belongsTo(models.Turno, {
      foreignKey: "turnoId",
      as: "turno",
    });

    this.hasMany(models.SolicitacaoHistoricoNotas, {
      foreignKey: "estudanteId",
      as: "solicitacaoHistoricoNotas",
    });

    this.hasMany(models.SolicitacaoRequerimento, {
      foreignKey: "estudanteId",
      as: "solicitacaoRequerimento",
    });

    this.hasMany(models.SolicitacaoDeclaracaoEstudos, {
      foreignKey: "estudanteId",
      as: "solicitacaoDeclaracaoEstudos",
    });
  }
}

module.exports = Estudante;
