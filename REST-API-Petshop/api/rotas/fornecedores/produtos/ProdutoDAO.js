const TabelaProduto = require('./ModeloTabelaProdutos.js');

module.exports = {
    listar(idFornecedor) {
        return TabelaProduto.findAll({
            where: {fornecedor: idFornecedor}
        });
    },
    adicionar(dados) {
        return TabelaProduto.create(dados);
    },
    deletar(idProduto, idFornecedor) {
        return TabelaProduto.destroy({where: {id: idProduto, fornecedor: idFornecedor}});
    }
}