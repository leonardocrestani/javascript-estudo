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
const SerializadorErro = require('./Serializador.js').SerializadorErro;

app.use(bodyParser.json());

app.use((req, res, next) => {
    let formatoRequisitado = req.header('Accept');
    if(formatoRequisitado === '*/*') {
        formatoRequisitado = 'application/json'
    }
    let existe = formatosAceitos.some((formato) => {
        return formato === formatoRequisitado;
    });
    if(!existe) {
        res.status(406);
        res.end()
    }
    else {
        res.setHeader('Content-Type', formatoRequisitado);
        next();
    }
});

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    next();
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
    const serializador = new SerializadorErro(res.getHeader('Content-Type'));
    res.send(serializador.serializar({mensagem: erro.message}));
});

app.listen(config.get('api.porta'), () => {
    console.log("Servidor rodando na porta 3000");
});