class ValorNaoSuportado extends Error {

    constructor(contentType) {
        super(`O tipo de conteudo ${contentType} nao e suportado`);
        this.name = 'ValorNaoSuportado'
    }

}

module.exports = ValorNaoSuportado;