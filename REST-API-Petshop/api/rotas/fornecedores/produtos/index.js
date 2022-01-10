const roteador = require('express').Router({mergeParams:true});
const TabelaProduto = require('./ProdutoDAO.js');
const Produto = require('./Produto.js');
const SerializadorProduto = require('../../../Serializador.js').SerializadorProduto;

roteador.get('/', async (req, res) => {
    const id = req.fornecedor.id;
    const produtos = await TabelaProduto.listar(id);
    const serializador = new SerializadorProduto(res.getHeader('Content-Type'));
    res.set('X-Powered-By', 'PIX');
    res.send(serializador.serializar(produtos));
});

roteador.post('/', async (req, res, next) => {
    try {
        const idFornecedor = req.fornecedor.id;
        const corpo = req.body;
        const dados = Object.assign({}, corpo, {fornecedorId: idFornecedor});
        const produto = new Produto(dados);
        const serializador = new SerializadorProduto(res.getHeader('Content-Type'));
        await produto.criar();
        res.status(201);
        res.send(serializador.serializar(produto));
    }
    catch(erro) {
        next(erro);
    }
});

roteador.delete('/:idProduto', async (req, res) => {
    const dados = {
        id: req.params.idProduto,
        fornecedorId: req.fornecedor.id
    };
    const produto = new Produto(dados);
    await produto.deletar();
    res.status(204);
    res.end();
});

roteador.get('/:idProduto', async (req, res, next) => {
    try{
        const dados = {
            id: req.params.idProduto,
            fornecedorId: req.fornecedor.id
        }
        const produto = new Produto(dados);
        const serializador = new SerializadorProduto(res.getHeader('Content-Type'), ['preco', 'estoque', 'dataCriacao', 'dataAtualizacao']);
        await produto.listarPeloId();
        res.status(200);
        res.send(serializador.serializar(produto));
    }
    catch(erro) {
        next(erro);
    }
});

roteador.put('/:idProduto', async (req, res, next) => {
    try {
        const dados = Object.assign({}, req.body, {
            id: req.params.idProduto,
            fornecedorId: req.fornecedor.id
        });
        const produto = new Produto(dados);
        await produto.atualizar();
        res.status(204),
        res.end();
    }
    catch(erro) {
        next(erro);
    }
});

roteador.post('/:idProduto/diminuir-estoque', async (req, res, next) => {
    try {
        const dados = {
            id: req.params.idProduto,
            fornecedorId: req.fornecedor.id
        }
        const produto = new Produto(dados);
        await produto.listarPeloId();
        produto.estoque = produto.estoque - req.body.quantidade;
        await produto.diminuirEstoque();
        res.set('X-Powered-By', 'PIX');
        res.status(204);
        res.end();
    }
    catch(erro) {
        next(erro);
    }
});

module.exports = roteador;