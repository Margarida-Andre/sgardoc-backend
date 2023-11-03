"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("pautaExame", {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },

      nota1: {
        type: Sequelize.DataTypes.REAL,
        allowNull: false,
      },

      nota2: {
        type: Sequelize.DataTypes.REAL,
        allowNull: false,
      },

      notaExame: {
        type: Sequelize.DataTypes.REAL,
        allowNull: false,
      },

      mediaFinal: {
        type: Sequelize.DataTypes.REAL,
        allowNull: false,
      },

      professorId: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },

      estudanteId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: "estudante",
          },
          key: "id",
        },
        allowNull: false,
      },

      semestreId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "semestre",
          },
          key: "id",
        },
        allowNull: false,
      },

      disciplinaId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: "disciplina",
          },
          key: "id",
        },
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

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("pautaExame");
  },
};
