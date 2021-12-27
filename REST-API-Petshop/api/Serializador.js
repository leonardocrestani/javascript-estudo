const ValorNaoSuportado = require('./erros/ValorNaoSuportado.js');
const jsontoxml = require('jsontoxml');

class Serializador {

    json(dados) {
        return JSON.stringify(dados);
    }

    xml(dados) {
        let tag = this.tagSingular;
        if(Array.isArray(dados)) {
            tag = this.tagPlural;
            dados = dados.map((item) => {
                return {
                    [this.tagSingular]: item
                }
            });
        }
        return jsontoxml({[tag]: dados});
    }

    serializar(dados) {
        dados = this.filtrar(dados);
        if(this.contentType === 'application/json'){
            return this.json(dados);
        }
        if(this.contentType === 'application/xml') {
            return this.xml(dados);
        }
        else {
            throw new ValorNaoSuportado(this.contentType);
        }
    }

    filtrar(dados) {
        if(Array.isArray(dados)) {
            dados = dados.map((item) => { return this.filtrarObjeto(item) });
        }
        else {
            dados = this.filtrarObjeto(dados);
        }
        return dados;
    }

    filtrarObjeto(dados) {
        let novosDados = {};
        this.camposPublicos.forEach((campo) => {
            if(dados.hasOwnProperty(campo)) {
                novosDados[campo] = dados[campo];
            }
        });

        return novosDados;
    }

}

class SerializadorFornecedor extends Serializador {

    constructor(contentType, camposExtras) {
        super();
        this.contentType = contentType;
        // campos publicos sao os campos que vamos devolver na resposta para o cliente
        // server para que nao enviemos campos sensiveis que nao podem ser vistos na resposta
        this.camposPublicos = ['id', 'empresa', 'categoria'].concat(camposExtras || []);
        this.tagSingular = 'fornecedor';
        this.tagPlural = 'fornecedores'
    }
    
}

class SerializadorErro extends Serializador {
    constructor(contentType, camposExtras) {
        super();
        this.contentType = contentType;
        this.camposPublicos = ['mensagem'].concat(camposExtras || []);
        this.tagSingular = 'erro';
        this.tagPlural = 'erros'
    }
}

module.exports = {
    Serializador: Serializador,
    SerializadorFornecedor: SerializadorFornecedor,
    SerializadorErro: SerializadorErro,
    formatosAceitos: ['application/json', 'application/xml']
}