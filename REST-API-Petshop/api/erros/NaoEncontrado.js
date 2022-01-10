class NaoEncontrado extends Error {

    constructor(id, nome) {
        super(`${nome} com o id: ${id} nao encontrado`);
        this.name = 'NaoEncontrado';
    }

}

module.exports = NaoEncontrado;