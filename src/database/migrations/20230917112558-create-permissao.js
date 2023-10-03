"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("permissao", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },

      nome: {
        type: Sequelize.STRING(100),
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

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("permissao");
  },
};
