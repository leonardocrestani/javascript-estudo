class Negociacao {

    // Classe modelo de negociacao
    // Esta classe monta um negociacao com seus atributos e comportamentos
    constructor(data, quantidade, valor) {
        this._data = new Date(data.getTime());
        this._quantidade = quantidade;
        this._valor = valor;
        Object.freeze(this);
    }

    get data() {
        return this._data;
    }

    get quantidade() {
        return this._quantidade;
    }

    get valor() {
        return this._valor
    }

    get volume() {
        var volume = this._quantidade * this._valor;
        return volume;
    }

}