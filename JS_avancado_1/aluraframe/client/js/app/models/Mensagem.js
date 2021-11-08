class Mensagem {

    // Classe modelo menasgem
    // Esta classe recebe e armazena uma mensagem no parametro texto
    // O conteudo desta classe vai ser apenas a mensagem texto
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