class CampoInvalido extends Error {

    constructor(campo) {
        super(`O campo '${campo}' esta invalido`);
        this.name = 'CampoInvalido';
    }

}

module.exports = CampoInvalido;