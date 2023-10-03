"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("solicitacaoDeclaracaoEstudos", {
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

      tipoDeclaracaoId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "tipoDeclaracao",
          },
          key: "id",
        },
        allowNull: false,
      },

      duracaoDeclaracaoId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "duracaoDeclaracao",
          },
          key: "id",
        },
        allowNull: false,
      },

      efeitoDeclaracaoId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "efeitoDeclaracao",
          },
          key: "id",
        },
        allowNull: false,
      },

      outroEfeito: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable("solicitacaoDeclaracaoEstudos");
  },
};
