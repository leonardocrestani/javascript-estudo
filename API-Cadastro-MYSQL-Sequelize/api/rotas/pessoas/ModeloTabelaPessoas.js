const Sequelize = require('sequelize');
const instancia = require('../../banco-de-dados/index.js');

const colunasTabela = {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sobrenome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
}

const configTabela = {
    freezeTableName: true,
    tableName: 'pessoas',
    timestamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao'
}

const tabelaDefinida = instancia.define('pessoa', colunasTabela, configTabela);

module.exports = tabelaDefinida;