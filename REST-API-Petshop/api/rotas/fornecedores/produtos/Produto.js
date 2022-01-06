const ProdutoDAO = require('./ProdutoDAO.js');

class Produto {
    constructor({id, titulo, preco, estoque, fornecedorId, dataCriacao, dataAtualizacao}) {
        this.id = id;
        this.titulo = titulo;
        this.preco = preco;
        this.estoque = estoque;
        this.fornecedor = fornecedorId;
        this.dataCriacao = dataCriacao;
        this.dataAtualizacao = dataAtualizacao;
    }

    validar() {
        if(typeof this.titulo !== 'string' || this.titulo.length === 0) {
            throw new Error("O campo 'titulo' esta invalido");
        }
        if(typeof this.preco !== 'number' || this.preco === 0) {
            throw new Error("O campo 'preco' esta invalido");
        }
        if(typeof this.estoque !== 'number') {
            throw new Error("O campo 'estoque' esta invalido");
        }
    }

    async criar() {
        this.validar();
        const resultado = await ProdutoDAO.adicionar({
            titulo: this.titulo,
            preco: this.preco,
            estoque: this.estoque,
            fornecedor: this.fornecedor
        });
        // completando o objeto com as informacoes somente adicionadas na insercao no BD
        this.id = resultado.id,
        this.dataCriacao = resultado.dataCriacao,
        this.dataAtualizacao = resultado.dataAtualizacao
    }

    async deletar() {
        await ProdutoDAO.deletar(this.id, this.fornecedor);
    }
}

module.exports = Produto;