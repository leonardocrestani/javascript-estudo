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


        // instancia a view de negociacao passando o elemento alvo do html que ela vai ser exibida
        this._negociacoesView = new NegociacoesView(document.querySelector('#negociacoesView'));
        // instancia a view de mensagem e passa o elemento alvo do html onde essa view vai ser exibida/inserida
        this._mensagemView = new MensagemView(document.querySelector('#mensagemView'));

        // cria um modelo de lista de negociacoes como proxy
        // este atributo guarda o modelo da lista de negociacoes
        this._listaNegociacoes = new Bind(new ListaNegociacoes(), this._negociacoesView, "adiciona", "apagaLista", "ordena");
        // cria o modelo(proxy) de mensagem
        this._mensagem = new Bind(new Mensagem(), this._mensagemView, "texto");
        this._selectTag = document.querySelector('#negociacoesLista');

        this._init();

    }

    // Funcao init serve para que este codigo que precisa ser executado no construtor da classe fique isolado
    // A funcao init e chamado no construtor
    _init() {
        // conexao com o banco de dados para toda vez que carregar a pagina ele pegar as negociacoes do banco e mostrar na tabela
        // faz uma chamada para pegar a conexao e passa ela para o dao que varre o banco e devolve as negociacoes
        ConnectionFactory.getConnection()
        .then((connection) => {
            new NegociacaoDao(connection)
            .listaTodos()
            .then((negociacoes) => {
                negociacoes.forEach((negociacao) => {
                    this._listaNegociacoes.adiciona(negociacao);
                });
            });
        })
        .catch(erro => {
            console.log(erro);
            this._mensagem.texto = erro;
        });

        setInterval(() => {
            this.importaNegociacoes();
        }, 3000);
    }

    adiciona(event) {
        // previne o evento padrao do formulario de recarregar a pagina
        event.preventDefault();

        let negociacao = this._criaNegociacao();

        new NegociacaoService()
        .cadastra(negociacao)
        .then((mensagemSucesso => {
            this._listaNegociacoes.adiciona(negociacao);
            this._mensagem.texto = mensagemSucesso;
            this._limpaFormulario();
        }))
        .catch(erro => {
            this._mensagem.texto = erro;
        });
    }

    importaNegociacoes() {
        let service = new NegociacaoService();

        let promiseSemana = service.obterNegociacoesDaSemana();
        let promiseSemanaPassada = service.obterNegociacoesDaSemanaPassada();
        let promiseSemanaRetrasada = service.obterNegociacoesDaSemanaRetrasada();

        Promise.all([promiseSemana, promiseSemanaPassada, promiseSemanaRetrasada])
        .then((negociacoes) => {
            let arrayUnico = negociacoes.reduce((arrayUnico, array) => {
                return arrayUnico.concat(array);
            }, []);
            let arrayFiltrado = arrayUnico.filter((negociacao) => {
                return !this._listaNegociacoes.negociacoes.some(negociacaoExistente => {
                    return JSON.stringify(negociacaoExistente) == JSON.stringify(negociacao);
                });
            });
            return arrayFiltrado;
        })
        .then((negociacoes) => {
            negociacoes.forEach((negociacao) => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = "Negociacoes obtidas com sucesso";
            });
        })
        .catch((erro) => {
            this._mensagem.texto = erro;
        });
    }

    // apaga a lista de negociacoes
    apagaLista() {
        ConnectionFactory.getConnection()
        .then((connection) => {
            new NegociacaoDao(connection).apagaTodos()
            .then((mensagemSucesso) => {
                this._mensagem.texto = mensagemSucesso;
            });
        })
        .catch(erro => {
            this._mensagem.texto = erro;
        });
        // como o botao de apagar nao esta no formulario nao e necessario previnir o evento default
        // apaga a lista utilizando o metodo implementado no model
        this._listaNegociacoes.apagaLista();
        // setando uma mensagem para o elemento mensagem
        this._mensagem.texto = "Lista de negociacoes apagada"
    }

    // cria um objeto negociacao
    _criaNegociacao() {
        let arrayData = DateHelper.textoParaData(this._inputData.value);
        let data = new Date(...arrayData);
        return new Negociacao(
            data,
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }

    // reseta os campos do formulario
    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

    ordenaPelaLista() {
        let coluna = this._selectTag.options[this._selectTag.selectedIndex].value;
        this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
    }

    ordena(coluna) {
        this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
    }

}