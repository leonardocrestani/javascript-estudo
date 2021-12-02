class NegociacaoDao {

    constructor(connection) {
        this._connection = connection;
        // Store do banco de dados que este dao vai operar
        this._store = "negociacoes";
    }

    adiciona(negociacao) {
        return new Promise((resolve, reject) => {
            let transaction = this._connection.transaction([this._store], "readwrite");
            let store = transaction.objectStore(this._store);

            let request = store.add(negociacao);

            request.onsuccess = (event) => {
                resolve();
            }

            request.onerror = (event) => {
                console.log(event.target.error);
                reject("Nao foi possivel adicionar a negociacao");
            }
        });
    }

    listaTodos() {
        return new Promise((resolve, reject) => {
            let cursor = this._connection.transaction([this._store], "readwrite")
                        .objectStore(this._store)
                        .openCursor();

            let negociacoes = [];
            cursor.onsuccess = (event) => {
                let atual = event.target.result;
                if(atual) {
                    let dado = atual.value;
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                    atual.continue();
                }
                else {
                    resolve(negociacoes);
                }
            }

            cursor.onerror = (event) => {
                console.log(event.target.error.name);
                reject("Nao foi possivel listar as negociacoes");
            } 
        });
    }

    apagaTodos() {
        return new Promise((resolve, reject) => {
            let request = this._connection.transaction([this._store], "readwrite")
                        .objectStore(this._store)
                        .clear();
            
            request.onsuccess((event) => {
                resolve("Negociacoes removidas com sucesso");
            });

            request.onerror((event) => {
                console.log(event.target.error);
                reject("Nao foi possivel excluir as negociacoes");
            });
        });
    }
}