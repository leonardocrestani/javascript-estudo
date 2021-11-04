class NegociacaoController {

    // Classe controller
    // Captura acoes do usuario, interage com nosso model executando os comportamentos
    // Interage com nossas views e atualiza a pagina
    constructor() {
        // criando os atributos na instanciacao
        // pega os valores dos inputs da negociacao
        this._inputData = document.querySelector('#data');
        this._inputQuantidade = document.querySelector('#quantidade');
        this._inputValor = document.querySelector('#valor');

        // cria um modelo de lista de negociacoes
        // este atributo guarda o modelo de lista que contem o array
        this._listaNegociacoes = new ListaNegociacoes();
        
        // instancia a view de negociacao passando o elemento alvo do html que ela vai ser exibida
        this._negociacoesView = new NegociacoesView(document.querySelector('#negociacoesView'));
        // atualiza a view de negociacao passando a lista
        this._negociacoesView.update(this._listaNegociacoes);

        // cria o modelo de mensagem
        this._mensagem = new Mensagem();
        // instancia a view de mensagem passando o elemento alvo do html que ela vai ser exibida
        this._mensagemView = new MensagemView(document.querySelector('#mensagemView'));
        // atualiza a view de negociacao passando a lista
        this._mensagemView.update(this._mensagem);
    }

    adiciona(event) {
        // previne o evento padrao do formulario de recarregar a pagina
        event.preventDefault();

        // instanciacao do helper de data para para manipular a data que vem do html
        // Pega a data que vem como "2021-11-01" e transforma em ["2021", "11", "01"] com o metodo textoParaData do helper
        let arrayData = DateHelper.textoParaData(this._inputData.value);
        console.log(arrayData);

        // Aqui ocorre o spread assim ele passa como parametro para Date(2021, 10, 01) e cria a data
        let data = new Date(...arrayData);
        console.log(data); // Mon Nov 01 2021 00:00:00 GMT-0300

        // cria uma negociacao a partir do metodo da classe controller
        let negociacao = this._criaNegociacao(data);

        // apos criar a negociacao ele adiona ela no array de negociacoes
        this._listaNegociacoes.adiciona(negociacao);
        console.log(this._listaNegociacoes.negociacoes);
        
        // atualiza nossa view de negociacao com os elementos do array
        this._negociacoesView.update(this._listaNegociacoes);
        // seta a mensagem que deve ser exibida quando criar uma negociacao
        this._mensagem.texto = "Negociacao criada com sucesso !"
        //atualiza noss view de mensagem com essa mensagem
        this._mensagemView.update(this._mensagem);

        // reseta os campos do formulario
        this._limpaFormulario();
    }

    // cria um objeto negociacao
    _criaNegociacao(data) {
        return new Negociacao(
            data,
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    // reseta os campos do formulario
    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

}