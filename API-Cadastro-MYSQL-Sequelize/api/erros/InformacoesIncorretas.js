class InformacoesIncorretas extends Error {
    constructor() {
        super('email ou senha incorretos');
        this.nome = 'InformacoesIncorretas';
    }
}

module.exports = InformacoesIncorretas;