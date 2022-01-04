const Sequelize = require('sequelize');
const config = require('config');

const instancia = new Sequelize(
    config.get('banco-de-dados.nome'),
    config.get('banco-de-dados.usuario'),
    config.get('banco-de-dados.senha'),
    {
        host: config.get('banco-de-dados.host'),
        dialect: config.get('banco-de-dados.tipo')
    }
);

module.exports = instancia;