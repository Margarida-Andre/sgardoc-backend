"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("solicitacaoRequerimento", {
      id: {
        type: Sequelize.UUID,
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

      estadoId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "estado",
          },
          key: "id",
        },
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      telefonePrincipal: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      telefoneAlternativo: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      comprovativoPagamento: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      assunto: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      motivo: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      autorizacao: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable("solicitacaoRequerimento");
  },
};
