const express = require('express');
const router = express.Router();
const TabelaPessoa = require('../pessoas/ModeloTabelaPessoas.js');
const Pessoa = require('./Pessoa.js');
const InformacoesIncorretas = require('../../erros/InformacoesIncorretas.js');
const UsuarioJaCadastrado = require('../../erros/UsuarioJaCadastrado.js');
const SerializadorPessoas = require('../../Serializador.js').SerializadorPessoas;

router.get('/', async (req, res) => {
    // opcao raw true traz os dados em array normal
    const resultados = await TabelaPessoa.findAll({raw: true});
    let serializador = new SerializadorPessoas(res.getHeader('Content-Type'));
    res.send(serializador.serializar(resultados));
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

router.post('/cadastro', async (req, res, next) => {
    try {
        const dados = req.body;
        const pessoa = new Pessoa(dados);
        let pessoaBanco = await TabelaPessoa.findAll();
        let serializador = new SerializadorPessoas(res.getHeader('Content-Type'));
        if(Array.isArray(pessoa)) {
            pessoaBanco = pessoa.map((item) => {
                return item.dataValues;
            });
        }
        let existe = pessoaBanco.some((pessoa) => {
            return pessoa.email === dados.email;
        });
        if(existe) {
            throw new UsuarioJaCadastrado();
        }
        else {
            await pessoa.adiciona(pessoa);
            res.status(201);
            res.send(serializador.serializar(pessoa));
        }
    }
    catch(erro) {
        next(erro);
    }
    
});

router.post('/login', async (req, res, next) => {
    try {
        const dados = req.body;
        const pessoa = new Pessoa(dados);
        await pessoa.verificaExistencia();
        let serializador = new SerializadorPessoas(res.getHeader('Content-Type'));
        res.status(200);
        res.send(serializador.serializar(pessoa));
    }
    catch(erro) {
        next(erro);
    }
});

module.exports = router;