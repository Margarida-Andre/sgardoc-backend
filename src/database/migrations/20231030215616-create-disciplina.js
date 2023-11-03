"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("disciplina", {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },

      designacao: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      descricao: {
        type: Sequelize.STRING(100),
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
    return queryInterface.dropTable("disciplina");
  },
};
