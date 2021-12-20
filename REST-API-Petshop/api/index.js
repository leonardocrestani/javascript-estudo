const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const roteador = require('./rotas/fornecedores/index.js');

app.use(bodyParser.json());

app.use('/api/fornecedores', roteador);

app.listen(config.get('api.porta'), () => {
    console.log("Servidor rodando na porta 3000");
});