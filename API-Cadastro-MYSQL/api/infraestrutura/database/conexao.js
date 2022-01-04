const mysql = require("mysql");
const config = require("config");

const conexao = mysql.createConnection({
    host: config.get('banco-de-dados.host'),
    port: config.get('banco-de-dados.porta'),
    user: config.get('banco-de-dados.usuario'),
    password: config.get('banco-de-dados.senha'),
    database: config.get('banco-de-dados.database.cadastro')
});

module.exports = conexao;