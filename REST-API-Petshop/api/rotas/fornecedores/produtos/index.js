const roteador = require('express').Router({mergeParams:true});
const TabelaProduto = require('./ProdutoDAO.js');
const Produto = require('./Produto.js');

roteador.get('/', async (req, res) => {
    const id = req.params.idFornecedor;
    const produtos = await TabelaProduto.listar(id);
    res.send(JSON.stringify(produtos));
});

roteador.post('/', async (req, res, next) => {
    try {
        const idFornecedor = req.params.idFornecedor;
        const corpo = req.body;
        const dados = Object.assign({}, corpo, {fornecedorId: idFornecedor});
        const produto = new Produto(dados);
        await produto.criar();
        res.status(201);
        res.send(JSON.stringify(produto));
    }
    catch(erro) {
        next(erro);
    }
});

roteador.delete('/:idProduto', async (req, res) => {
    const dados = {
        id: req.params.idProduto,
        fornecedorId: req.params.idFornecedor
    };
    const produto = new Produto(dados);
    await produto.deletar();
    res.status(204);
    res.end();
});

module.exports = roteador;