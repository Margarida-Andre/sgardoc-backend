"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("estudanteDisciplina", {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
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
    return queryInterface.dropTable("estudanteDisciplina");
  },
};
