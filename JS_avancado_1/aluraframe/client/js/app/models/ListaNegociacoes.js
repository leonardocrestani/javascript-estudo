class ListaNegociacoes {

    // Classe modelo lista de negociacoes
    // Esta classe e um modelo de listas ela guarda valores de negociacoes e calcula o volume total
    // Classe de listas apenas de negociacoes tem seus comportamento especificos
    constructor(armadilha) {
        this._negociacoes = [];
        this._armadilha = armadilha;
    }

    get negociacoes() {
        return this._negociacoes;
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
        this._armadilha(this);
    }

    apagaLista() {
        if(this._negociacoes.length == 0) {
            throw new Error("A lista esta vazia nao e possivel apagar");
        }
        else {
            this._negociacoes = [];
            this._armadilha(this);
        }
    }

    totalVolume() {
        return this._negociacoes.reduce(function(total, negociacao) {
            return total += negociacao.volume;
        }, 0.0);
    }

}