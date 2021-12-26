class NaoEncontrado extends Error {

    constructor(id) {
        super(`Fornecedor com o id: ${id} nao encontrado`);
        this.name = 'NaoEncontrado';
    }

}

module.exports = NaoEncontrado;