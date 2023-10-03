"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("estudante", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },

      usuarioId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: "usuario",
          },
          key: "id",
        },
        allowNull: false,
      },

      matriculaId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: "matricula",
          },
          key: "id",
        },
        allowNull: false,
      },

      cursoId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: "curso",
          },
          key: "id",
        },
        allowNull: false,
      },

      grauAcademicoId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: "grauAcademico",
          },
          key: "id",
        },
        allowNull: false,
      },

      turmaId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: "turma",
          },
          key: "id",
        },
        allowNull: false,
      },

      turnoId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "turno",
          },
          key: "id",
        },
        allowNull: false,
      },

      numeroProcesso: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      descricao: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },

      criadoPor: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },

      actualizadoPor: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("estudante");
  },
};
