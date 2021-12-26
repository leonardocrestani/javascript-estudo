const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const roteador = require('./rotas/fornecedores/index.js');

// Classes que controlam erros
const NaoEncontrado = require('./erros/NaoEncontrado.js');
const CampoInvalido = require('./erros/CampoInvalido.js');
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos.js');
const ValorNaoSuportado = require('./erros/ValorNaoSuportado.js');

const formatosAceitos = require('./Serializador.js').formatosAceitos;

app.use(bodyParser.json());

app.use((req, res, next) => {
    let formatoRequisitado = req.header('Accept');
    if(formatosAceitos.indexOf(formatoRequisitado) === -1) {
        res.status(406);
        res.end();
    }
    else {
        if(formatoRequisitado === '*/*') {
            formatoRequisitado = 'application/json';
        }
        res.setHeader('Content-type', formatoRequisitado);
        next();
    }
});

app.use('/api/fornecedores', roteador);

app.use((erro, req, res, next) => {
    if(erro instanceof NaoEncontrado) {
        res.status(404);
    }
    if(erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos) {
        res.status(400);
    }
    if(erro instanceof ValorNaoSuportado) {
        res.status(406);
    }
    res.send(JSON.stringify({
        mensagem: erro.message
    }));
});

app.listen(config.get('api.porta'), () => {
    console.log("Servidor rodando na porta 3000");
});