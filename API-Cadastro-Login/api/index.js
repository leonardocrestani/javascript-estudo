const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const router = require('./rotas/pessoas/index.js');
const InformacoesIncorretas = require('./rotas/erros/InformacoesIncorretas.js');
const UsuarioJaCadastrado = require('./rotas/erros/UsuarioJaCadastrado.js');


app.use(bodyParser.json());

app.use('/acessos', router);

app.use((erro, req, res, next) => {
    if(erro instanceof InformacoesIncorretas || erro instanceof UsuarioJaCadastrado) {
        res.status(400);
    }
    res.send(JSON.stringify({
        mensagem: erro.message
    }));
});

app.listen(config.get('api.porta'), () => {
    console.log("Servidor rodando");
});