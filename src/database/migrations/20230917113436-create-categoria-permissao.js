"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("categoriaPermissao", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },

      categoriaId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: "categoria",
          },
          key: "id",
        },
        allowNull: false,
      },

      permissaoId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: "permissao",
          },
          key: "id",
        },
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
    return queryInterface.dropTable("categoriaPermissao");
  },
};
