const ValorNaoSuportado = require('./erros/ValorNaoSuportado.js');

class Serializador {

    json(dados) {
        return JSON.stringify(dados);
    }

    serializar(dados) {
        if(this.contentType === 'application/json') {
            dados = this.filtrar(dados);
            return this.json(dados);
        }
        else {
            throw new ValorNaoSuportado();
        }
    }

    filtrar(dados) {
        if(Array.isArray(dados)) {
            dados = dados.map((item) => { return this.filtrarObjeto(item) });
        }
        else {
            dados = this.filtrarObjeto(dados);
        }
        return dados
    }

    filtrarObjeto(dados) {
        let novoArrayDados = {};
        this.camposPublicos.forEach((campo) => {
            if(dados.hasOwnProperty(campo)) {
                novoArrayDados[campo] = dados[campo];
            }
        });
        return novoArrayDados;
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