const express = require('express');
const router = express.Router();
const TabelaPessoa = require('../pessoas/ModeloTabelaPessoas.js');
const Pessoa = require('./Pessoa.js');
const InformacoesIncorretas = require('../erros/InformacoesIncorretas.js');
const UsuarioJaCadastrado = require('../erros/UsuarioJaCadastrado.js');

router.get('/', async (req, res) => {
    const resultados = await TabelaPessoa.findAll();
    res.send(JSON.stringify(resultados)); 
});

router.post('/cadastro', async (req, res, next) => {
    try {
        const dados = req.body;
        const pessoa = new Pessoa(dados);
        let pessoaBanco = await TabelaPessoa.findAll();
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
            res.send(JSON.stringify(pessoa));
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
        let pessoaBanco = await TabelaPessoa.findAll();
        if(Array.isArray(pessoa)) {
            pessoaBanco = pessoa.map((item) => {
                return item.dataValues;
            });
        }
        let existe = pessoaBanco.some((pessoa) => {
            return pessoa.email === dados.email && pessoa.senha === dados.senha;
        });
        if(!existe) {
            throw new InformacoesIncorretas();
        }
        else {
            console.log("acesso concedido");
            res.status(200);
            res.send(JSON.stringify(pessoa));
        }
    }
    catch(erro) {
        next(erro);
    }
});

module.exports = router;