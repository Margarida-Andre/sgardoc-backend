"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("usuarioCategoria", {
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
    return queryInterface.dropTable("usuarioCategoria");
  },
};
