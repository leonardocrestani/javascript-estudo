const express = require('express');
const roteador = express.Router();
const Tabela = require('../fornecedores/ModeloTabelaFornecedor.js');
// esta recebendo o nome da tabela 'fornecedor'
const Fornecedor = require('../fornecedores/Fornecedor.js');

roteador.get('/', async (req, res) => {
    const resultados = await Tabela.findAll();
    res.send(JSON.stringify(resultados));
});


roteador.post('/', async (req, res) => {
    const dadosRecebidos = req.body;
    const fornecedor = new Fornecedor(dadosRecebidos);
    await fornecedor.criar(fornecedor);
    res.send(JSON.stringify(fornecedor));
});

roteador.get('/:idFornecedor', async (req, res) => { 
    try {
        const id = req.params.idFornecedor;
        const fornecedor = new Fornecedor({ id: id });
        await fornecedor.listarPeloId();
        res.send(JSON.stringify(fornecedor));
    }
    catch(erro) {
        res.send(JSON.stringify({
            mensagem: erro.message
        }));
    }
});

roteador.put('/:idFornecedor', async (req, res) => {
    try {
        const id = req.params.idFornecedor;
        const dadosRecebidos = req.body;
        const dados = Object.assign({}, dadosRecebidos, {id: id});
        const fornecedor = new Fornecedor(dados);
        await fornecedor.atualiza();
        res.end();
    }
    catch(erro) {
        res.send(JSON.stringify({
            mensagem: erro.message
        }));
    }
});

module.exports = roteador;