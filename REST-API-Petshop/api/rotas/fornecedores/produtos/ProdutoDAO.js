const TabelaProduto = require('./ModeloTabelaProdutos.js');
const instancia = require('../../../banco-de-dados/index.js');
const NaoEncontrado = require('../../../erros/NaoEncontrado.js');

module.exports = {
    listar(idFornecedor) {
        return TabelaProduto.findAll({where: {fornecedor: idFornecedor}, raw: true});
    },
    adicionar(dados) {
        return TabelaProduto.create(dados);
    },
    deletar(idProduto, idFornecedor) {
        return TabelaProduto.destroy({where: {id: idProduto, fornecedor: idFornecedor}});
    },
    async listarPeloId(idProduto, idFornecedor) {
        const produtoEncontrado = await TabelaProduto.findOne({where: {id: idProduto, fornecedor: idFornecedor}, raw:true});
        if(!produtoEncontrado) {
            throw new Error("Produto nao encontrado");
        }
        else {
            return produtoEncontrado;
        }
    },
    async atualizar(idProduto, idFornecedor, dados) {
        const produtoEncontrado = await TabelaProduto.findOne({where: {id: idProduto, fornecedor: idFornecedor}, raw:true});
        if(!produtoEncontrado) {
            throw new NaoEncontrado(idProduto, 'Produto');
        }
        else {
            return TabelaProduto.update(dados, {where: {id: idProduto, fornecedor: idFornecedor}});
        }
    },
    async diminuirEstoque(idProduto, idFornecedor, campo, quantidade) {
        return instancia.transaction(async transacao => {
            const produto = await TabelaProduto.findOne({where: {id: idProduto, fornecedor:idFornecedor}});
            // pega o campo `estoque` e coloca a nova quantidade nele
            produto[campo] = quantidade;
            // realiza a atualizacao no banco com as novas informacoes
            await produto.save();
            return produto;
        });
    }
}