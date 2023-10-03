"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("inscricaoExameAcesso", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },

      provinciaId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "provincia",
          },
          key: "id",
        },
        allowNull: false,
      },

      municipioId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "municipio",
          },
          key: "id",
        },
        allowNull: false,
      },

      estadoCivilId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "estadoCivil",
          },
          key: "id",
        },
        allowNull: false,
      },

      generoId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "genero",
          },
          key: "id",
        },
        allowNull: false,
      },

      opcao1CursoId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: "curso",
          },
          key: "id",
        },
        allowNull: false,
      },

      opcao2CursoId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: "curso",
          },
          key: "id",
        },
        allowNull: true,
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

      nome: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      dataNascimento: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      numeroBi: {
        type: Sequelize.STRING(14),
        allowNull: false,
      },

      dataEmissaoBi: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      validadeBi: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      arquivoIdentificacao: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      carregamentoBi: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },

      certificadoEnsinoMedio: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },

      carregamentoFotografia: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },

      comprovativoPagamento: {
        type: Sequelize.STRING(300),
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

      nomePai: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },

      nomeMae: {
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

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("inscricaoExameAcesso");
  },
};
