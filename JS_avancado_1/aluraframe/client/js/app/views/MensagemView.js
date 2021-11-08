class MensagemView extends View {

    // utiliza automaticamente o construtor da classe mae por estar extendendo ela

    // utiliza o metodo update que vem da clase mae

    // define o template que deve ser colocado na pagina
    template(model) {
        return `<p class"alert alert-info">${model.texto}</p>`;
    }

}