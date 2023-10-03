"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("grauAcademico", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
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

      grau: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    return queryInterface.dropTable("grauAcademico");
  },
};
