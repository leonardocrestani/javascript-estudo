class NegociacaoService {

    constructor() {
        this._http = new HttpService(); 
    }

    obterNegociacoesDaSemana() {

        return new Promise((resolve, reject) => {
            this._http.get("http://localhost:3000/negociacoes/semana")
            .then((negociacoes) => {
                console.log(negociacoes)
                let arrayNegociacoes = negociacoes.map((objeto) => {
                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                });
                resolve(arrayNegociacoes);
            })
            .catch((erro) => {
                console.log(erro);
                reject("Nao foi possivel obter as negociacoes da semana");
            });
        });

    }

    obterNegociacoesDaSemanaPassada() {

        return new Promise((resolve, reject) => {
            this._http.get("http://localhost:3000/negociacoes/anterior")
            .then((negociacoes) => {
                let arrayNegociacoes = negociacoes.map((objeto) => {
                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                });
                resolve(arrayNegociacoes);
            })
            .catch((erro) => {
                console.log(erro);
                reject("Nao foi possivel obter as negociacoes da semana");
            });
        });

    }

    obterNegociacoesDaSemanaRetrasada() {

        return new Promise((resolve, reject) => {
            this._http.get("http://localhost:3000/negociacoes/retrasada")
            .then((negociacoes) => {
                let arrayNegociacoes = negociacoes.map((objeto) => {
                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                });
                resolve(arrayNegociacoes);
            })
            .catch((erro) => {
                console.log(erro);
                reject("Nao foi possivel obter as negociacoes da semana");
            });
        });

    }

}