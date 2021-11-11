class NegociacoesView extends View {

    // utiliza automaticamente o construtor da classe mae por estar extendendo ela

    // utiliza o metodo update que vem da clase mae

    // define o template que deve ser colocado na pagina
    template(model) {
        return `<table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th onclick="negociacaoController.ordena('data')">DATA</th>
                    <th onclick="negociacaoController.ordena('quantidade')">QUANTIDADE</th>
                    <th onclick="negociacaoController.ordena('valor')">VALOR</th>
                    <th onclick="negociacaoController.ordena('volume')">VOLUME</th>
                </tr>
            </thead>
            
            <tbody>
                ${model.negociacoes.map((negociacao) => {
                    return `
                    <tr>
                        <td>${DateHelper.dataParaTexto(negociacao.data)}</td>
                        <td>${negociacao.quantidade}</td>
                        <td>${negociacao.valor}</td>
                        <td>${negociacao.volume}</td>
                    </tr>
                    `
                }).join('')}
            </tbody>
            
            <tfoot>
                <td colspan="3"></td>
                <td>
                    ${model.totalVolume()}
                </td>
            </tfoot>
        </table>`;
    }
    
}

