const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const router = require('./rotas/pessoas/index.js');
const ModeloTabelaCadastro = require('./rotas/pessoas/ModeloTabelaPessoas.js');
const InformacoesIncorretas = require('./erros/InformacoesIncorretas.js');
const UsuarioJaCadastrado = require('./erros/UsuarioJaCadastrado.js');
const formatosAceitos = require('./Serializador.js').formatosAceitos;


app.use(bodyParser.json());

let promiseTabelaCadastro = ModeloTabelaCadastro.sync();

Promise.all([promiseTabelaCadastro]).then(() => {
    console.log("Tabelas 'CADASTRO' e 'TESTE' foram chamadas");
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
})
.catch((erro) => {
    console.log(erro.message);
});