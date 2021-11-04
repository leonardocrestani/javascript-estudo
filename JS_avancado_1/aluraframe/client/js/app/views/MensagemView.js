class MensagemView extends View {

    // utiliza automaticamente o construtor da classe mae por estar extendendo ela

    // define o template que deve ser colocado na pagina
    template(model) {
        return `<p class"alert alert-info">${model.texto}</p>`;
    }

}