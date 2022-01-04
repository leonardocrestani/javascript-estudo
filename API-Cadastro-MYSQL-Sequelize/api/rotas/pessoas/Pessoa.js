const InformacoesIncorretas = require('../../erros/InformacoesIncorretas.js');
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

    async verificaExistencia() {
        const pessoaEncontrada = await TabelaPessoa.findOne({where: {email: this.email, senha: this.senha}});
        if(!pessoaEncontrada) {
            throw new InformacoesIncorretas();
        }
        else {
            this.id = pessoaEncontrada.id;
            this.nome = pessoaEncontrada.nome;
            this.sobrenome = pessoaEncontrada.sobrenome;
            this.dataCriacao = pessoaEncontrada.dataCriacao;
            this.dataAtualizacao = pessoaEncontrada.dataAtualizacao;
        }
    }

}

module.exports = Pessoa;