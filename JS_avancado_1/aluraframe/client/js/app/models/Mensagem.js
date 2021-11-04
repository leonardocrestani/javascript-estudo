class Mensagem {

    // Classe modelo menasgem
    // Esta classe recebe e mostra um mensagem modelo de exibicao de mensagem
    constructor(texto="") {
        this._texto = texto;
    }

    get texto() {
        return this._texto;
    }

    set texto(texto) {
        this._texto = texto;
    }

}