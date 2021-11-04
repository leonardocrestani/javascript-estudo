class ListaNegociacoes {

    // Classe modelo lista de negociacoes
    // Esta classe e um modelo de listas ela guarda valores de negociacoes e calcula o volume total
    // Classe de listas apenas de negociacoes tem seus comportamento especificos
    constructor() {
        this._negociacoes = [];
    }

    get negociacoes() {
        return this._negociacoes;
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }

    totalVolume() {
        return this._negociacoes.reduce(function(total, negociacao) {
            return total += negociacao.volume;
        }, 0.0);
    }

}