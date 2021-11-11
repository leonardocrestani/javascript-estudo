class Bind {

    constructor(model, view, ...props) {

        let proxy = ProxyFactory.createProxy(model, props, (model) => {
            view.update(model);
        });

        // atualiza a view do objeto que for passado para o bind
        view.update(model);

        return proxy;

    }

}