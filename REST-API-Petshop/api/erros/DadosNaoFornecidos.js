class DadosNaoFornecidos extends Error {

    constructor() {
        super('Nao foram fornecidos dados para atualizar');
        this.name = 'DadosNaoFornecidos';
    }

}

module.exports = DadosNaoFornecidos;