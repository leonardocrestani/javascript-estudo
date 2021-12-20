const Sequelize = require('sequelize');
const instancia = require('../../banco-de-dados/index.js');

const colunas = {
    empresa: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoria: {
        type: Sequelize.ENUM('racao', 'brinquedos'),
        allowNull: false
    }
}

const configuracoesTabela = {
    freezeTableName: true,
    tableName: 'fornecedores',
    timestamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao'
}

module.exports = instancia.define('fornecedor', colunas, configuracoesTabela);
// VAI ENVIAR O NOME DA TABELA 'fornecedor'