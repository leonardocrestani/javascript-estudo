const express = require('express');
const roteador = express.Router();
const Tabela = require('../fornecedores/ModeloTabelaFornecedor.js');
// esta recebendo o nome da tabela 'fornecedor'
const Fornecedor = require('../fornecedores/Fornecedor.js');
const { raw } = require('body-parser');
const SerializadorFornecedor = require('../../Serializador.js').SerializadorFornecedor;
// pegando as rotas de produtos do fornecedor
const roteadorProdutos = require('./produtos/index.js');

roteador.options('/', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204);
    res.end();
});

roteador.get('/', async (req, res) => {
    const resultados = await Tabela.findAll({raw: true});
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

roteador.options('/:idFornecedor', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204);
    res.end();
});

roteador.get('/:idFornecedor', async (req, res, next) => { 
    try {
        const id = req.params.idFornecedor;
        const fornecedor = new Fornecedor({ id: id });
        await fornecedor.listarPeloId();
        const serializador = new SerializadorFornecedor(res.getHeader('Content-Type'), ['email', 'dataCriacao', 'dataAtualizacao']);
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

const verificarFornecedor = async (req, res, next) => {
    try {
        const id = req.params.idFornecedor;
        const fornecedor = new Fornecedor({id: id});
        await fornecedor.listarPeloId();
        req.fornecedor = fornecedor;
        next();
    }
    catch(erro) {
        next(erro);
    }
}

roteador.use('/:idFornecedor/produtos', verificarFornecedor, roteadorProdutos);

module.exports = roteador;