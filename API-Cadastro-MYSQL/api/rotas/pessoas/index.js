const express = require('express');
const router = express.Router();
const Pessoa = require('./Pessoa.js');
const UsuarioJaCadastrado = require('../../erros/UsuarioJaCadastrado.js');
const InformacoesIncorretas = require('../../erros/InformacoesIncorretas.js');
const SerializadorPessoas = require('../../Serializador.js').SerializadorPessoas;

router.get('/', (req, res) => {
    try{
        const pessoa = new Pessoa();
        pessoa.listaTodas().then((resultado) => {
            let serializador = new SerializadorPessoas(res.getHeader('Content-Type'));
            res.send(serializador.serializar(resultado));
        })
        .catch((erro) => {
            next(erro);
        });
    }
    catch(erro) {
        next(erro);
    }
});

/*router.get('/login/:emailPessoa/:senhaPessoa', async (req, res, next) => {
    try {
        const email = req.params.emailPessoa;
        const senha = req.params.senhaPessoa;
        const pessoa = new Pessoa({email: email, senha: senha});
        await pessoa.verificaExistencia();
        let serializador = new SerializadorPessoas(res.getHeader('Content-Type'));
        res.status(200);
        res.send(serializador.serializar(pessoa));
    }
    catch(erro) {
        next(erro);
    }
});*/

router.post('/cadastro', (req, res, next) => {
    try {
        const dados = req.body;
        const pessoa = new Pessoa();
        pessoa.listaTodas().then((resultado) => {
            let serializador = new SerializadorPessoas(res.getHeader('Content-Type'));
            let existe = resultado.some((pessoa) => {
                return pessoa.email === dados.email;
            });
            if(existe) {
                throw new UsuarioJaCadastrado();
            }
            else {
                pessoa.adiciona(dados).then((resultado) => {
                    res.status(201);
                    res.send(serializador.serializar(resultado));
                })
                .catch((erro) => {
                    next(erro);
                });
            }
        })
        .catch((erro) => {
            next(erro);
        });
    }
    catch(erro) {
        next(erro);
    }
    
});

router.post('/login', (req, res, next) => {
    try {
        const dados = req.body;
        const pessoa = new Pessoa();
        pessoa.verificaExistencia(dados).then((resultado) => {
            let serializador = new SerializadorPessoas(res.getHeader('Content-Type'));
            res.status(200);
            res.send(serializador.serializar(resultado));
        })
        .catch((erro) => {
            next(erro);
        });
        
    }
    catch(erro) {
        next(erro);
    }
});

module.exports = router;