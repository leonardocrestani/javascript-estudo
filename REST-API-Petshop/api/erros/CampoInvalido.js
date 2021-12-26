class CampoInvalido extends Error {

    constructor(campo) {
        super(`Campo '${campo}' esta invalido`);
        this.name = 'CampoInvalido';
    }

}

module.exports = CampoInvalido;