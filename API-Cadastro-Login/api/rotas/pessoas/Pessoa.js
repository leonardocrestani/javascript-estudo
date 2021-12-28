const TabelaPessoa = require('./ModeloTabelaPessoas.js');

class Pessoa {

    constructor({id, nome, sobrenome, email, senha, dataCriacao, dataAtualizacao}) {
        this.id = id,
        this.nome = nome,
        this.sobrenome = sobrenome,
        this.email = email,
        this.senha = senha,
        this.dataCriacao = dataCriacao,
        this.dataAtualizacao = dataAtualizacao
    }

    async adiciona(pessoa) {
        const resultadoInsercao = TabelaPessoa.create(pessoa);
        // resultadoInsercao devolve o objeto inteiro que foi inserido no bd
        this.id = resultadoInsercao.id;
        this.dataCriacao = resultadoInsercao.dataCriacao;
        this.dataAtualizacao = resultadoInsercao.dataAtualizacao;
    }

    async listaPorId() {
        const pessoaEncontrada = await TabelaPessoa.findOne({where: {id: this.id}});
        if(!pessoaEncontrada) {
            throw new Error("Pessoa não encontrada no banco de dados");
        }
        else {
            this.nome = pessoaEncontrada.nome,
            this.sobrenome = pessoaEncontrada.sobrenome,
            this.email = pessoaEncontrada.email,
            this.senha = pessoaEncontrada.senha,
            this.dataCriacao = pessoaEncontrada.dataCriacao,
            this.dataAtualizacao = pessoaEncontrada.dataAtualizacao
        }
    }

}

module.exports = Pessoa;