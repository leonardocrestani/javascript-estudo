const express = require('express');
const roteador = express.Router();
const Tabela = require('../fornecedores/ModeloTabelaFornecedor.js');
// esta recebendo o nome da tabela 'fornecedor'
const Fornecedor = require('../fornecedores/Fornecedor.js');
const SerializadorFornecedor = require('../../Serializador.js').SerializadorFornecedor;


roteador.get('/', async (req, res) => {
    const resultados = await Tabela.findAll();
    const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'));
    res.status(200);
    res.send(serializador.serializar(resultados));
});


roteador.post('/', async (req, res, next) => {
    try {
        const dadosRecebidos = req.body;
        const fornecedor = new Fornecedor(dadosRecebidos);
        await fornecedor.criar(fornecedor);
        const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'));
        res.status(201);
        res.send(serializador.serializar(fornecedor));
    }
    catch(erro) {
        next(erro);
   }
});

roteador.get('/:idFornecedor', async (req, res, next) => { 
    try {
        const id = req.params.idFornecedor;
        const fornecedor = new Fornecedor({ id: id });
        await fornecedor.listarPeloId();
        const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'));
        res.status(200);
        res.send(serializador.serializar(fornecedor));
    }
    catch(erro) {
        next(erro);
    }
});

roteador.put('/:idFornecedor', async (req, res, next) => {
    try {
        const id = req.params.idFornecedor;
        const dadosRecebidos = req.body;
        const dados = Object.assign({}, dadosRecebidos, {id: id});
        const fornecedor = new Fornecedor(dados);
        await fornecedor.atualiza();
        res.status(204);
        res.end();
    }
    catch(erro) {
        next(erro);
    }
});

roteador.delete('/:idFornecedor', async (req, res, next) => {
    try {
        const id = req.params.idFornecedor;
        const fornecedor = new Fornecedor({id: id});
        await fornecedor.listarPeloId();
        await fornecedor.remover();
        res.status(204);
        res.end();
    }
    catch(erro) {
        next(erro);
    }
});

module.exports = roteador;