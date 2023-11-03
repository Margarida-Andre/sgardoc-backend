"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("semestre", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      designacao: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      descricao: {
        type: Sequelize.STRING(100),
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
    return queryInterface.dropTable("semestre");
  },
};
