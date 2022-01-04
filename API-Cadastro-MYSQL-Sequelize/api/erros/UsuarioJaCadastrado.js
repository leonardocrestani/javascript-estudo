class UsuarioJaCadastrado extends Error {
    constructor() {
        super('usuario ja cadastrado');
        this.nome = 'UsuarioJaCadastrado';
    }
}

module.exports = UsuarioJaCadastrado;