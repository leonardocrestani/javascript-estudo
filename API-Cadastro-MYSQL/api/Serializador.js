const ValorNaoSuportado = require('./erros/ValorNaoSuportado.js');

class Serializador {

    json(dados) {
        return JSON.stringify(dados);
    }

    serializar(dados) {
        if(this.contentType === 'application/json') {
            return this.json(dados);
        }
        else {
            throw new ValorNaoSuportado();
        }
    }
}

class SerializadorPessoas extends Serializador {
    constructor(contentType) {
        super();
        this.contentType = contentType;
        this.camposPublicos = ['nome', 'sobrenome'];
    }
}

module.exports = {
    SerializadorPessoas: SerializadorPessoas,
    formatosAceitos: ['application/json']
}