const ProdutoDAO = require('./ProdutoDAO.js');
const CampoInvalido = require('../../../erros/CampoInvalido.js');
const DadosNaoFornecidos = require('../../../erros/DadosNaoFornecidos.js');

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
            throw new CampoInvalido('titulo');
        }
        if(typeof this.preco !== 'number' || this.preco === 0) {
            throw new CampoInvalido('preco');
        }
        if(typeof this.estoque !== 'number') {
            throw new CampoInvalido('estoque');
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

    async listarPeloId() {
        const produto = await ProdutoDAO.listarPeloId(this.id, this.fornecedor);
        this.titulo = produto.titulo;
        this.preco = produto.preco;
        this.estoque = produto.estoque;
        this.dataCriacao = produto.dataCriacao;
        this.dataAtualizacao = produto.dataAtualizacao;
    }

    async atualizar() {
        const dadosParaAtualizar = {}
        // verificacao para saber se foram fornecidos dados para atualizar o produto
        if(typeof this.titulo === 'string' && this.titulo.length > 0) {
            dadosParaAtualizar.titulo = this.titulo;
        }
        if(typeof this.preco === 'number' && this.preco > 0) {
            dadosParaAtualizar.preco = this.preco;
        }
        if(typeof this.estoque === 'number') {
            dadosParaAtualizar.estoque = this.estoque;
        }
        if(Object.keys(dadosParaAtualizar).length === 0) {
            throw new DadosNaoFornecidos();
        }
        return ProdutoDAO.atualizar(this.id, this.fornecedor, dadosParaAtualizar);
    }

    diminuirEstoque() {
        return ProdutoDAO.diminuirEstoque(this.id, this.fornecedor, 'estoque', this.estoque);
    }
}

module.exports = Produto;