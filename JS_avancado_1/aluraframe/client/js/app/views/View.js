class View {

    // Classe mae view
    // Monta um html para ser jogado na pagina e atualiza o html da pagina
    constructor(elemento) {
        // local pego do html onde vai ser coloca no nossa view
        this._elementoAlvo = elemento;
    }

    // metodo template deve ser implementado nas classe filhas
    template() {
        throw new Error("Metodo template deve ser implementado pelas classes filhas");
    }

    // metodo update atualiza o html colocando nosso template criado dentro da pagina com o innerHTML
    update(model) {
        this._elementoAlvo.innerHTML = this.template(model);
    }

}