class ProxyFactory {

    // metodo que vai ser exetuado no controller
    // atributos que serao passados o objeto sera o que o objeto que o proxy vai criar
    // props vai ser um array com as propriedades que queremos executar esta armadilha
    // acao vai ser uma funcao a funcao que executa quando a armadilha e chamada
    static createProxy(objeto, props, acao) {
        return new Proxy(objeto, {

            // aqui verificamos quando ouver um get nesse proxy ele vai executar esta funcao
            // utilizamos um get pois quando sao metodos que colocam um valor em um atributo ele faz um get antes e depois um apply
            get: function(target, prop, receiver) {
                // verificacao se a propriedade que esta sendo executada e adiciona ou apagaList e se ela e uma funcao
                if(props.includes(prop) && typeof(target[prop]) == typeof(Function)) {
                    // se for ele substitui a funcao do adiciona ou apagaLista do proxy por essa que retornamos
                    return function() {
                        console.log(`interceptando ${prop}`);
                        // utilizamos o apply para executar funcao presente no objeto real
                        // target[prop] pegao elemento neste caso o metodo adiciona ou apagaLista
                        // target e o this onde que esta essa funcao
                        // arguments e o objeto negociacao que vai ser adicionado ou apagado
                        Reflect.apply(target[prop], target, arguments);
                        // apos isso executa o update da view passando o target que e o model no caso _listaNegociacoes
                        return acao(target);

                    }
                }
                // caso nao seja um funcao ou metodo ele apenas retorna o get do atributo
                return Reflect.get(target, prop, receiver);
            },

            set: function(target, prop, value, receiver) {
                if(props.includes(prop)) {
                    target[prop] = value;
                    acao(target);
                }
                return Reflect.set(target, prop, value, receiver);
            }

        });
    }

}
