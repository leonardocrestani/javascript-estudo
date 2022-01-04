const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const conexao = require('./infraestrutura/database/conexao.js');
const Tabelas = require('./infraestrutura/database/tabelas.js');
const router = require('./rotas/pessoas/index.js');
const InformacoesIncorretas = require('./erros/InformacoesIncorretas.js');
const UsuarioJaCadastrado = require('./erros/UsuarioJaCadastrado.js');
const formatosAceitos = require('./Serializador.js').formatosAceitos;


app.use(bodyParser.json());

conexao.connect((erro) => {
    if(erro) {
        res.status(403);
        res.send(JSON.stringify({
            mensagem: erro.message
        }));
    }
    else {
        try {
            Tabelas.init(conexao);
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
        }
        catch(erro) {
            res.status(403);
            res.send(JSON.stringify({
                mensagem: erro.message
            }));
        }           
    }
});