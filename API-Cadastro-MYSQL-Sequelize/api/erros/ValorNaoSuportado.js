class ValorNaoSuportado extends Error {
    constructor() {
        super('Valor nao suportado pela API');
        this.nome = 'ValorNaoSuportado';
    }
}

module.exports = ValorNaoSuportado;