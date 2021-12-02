
var ConnectionFactory = (function() {
    const stores = ["negociacoes"];
    const version = 4;
    const dbName = "aluraframe";

    var connection = null;

    var close = null;

    return class ConnectionFactory {

        constructor() {
            throw new Error("Nao e possivel criar instacias de connection factory");
        }

        static getConnection() {
            return new Promise((resolve, reject) => {
                let openRequest = window.indexedDB.open(dbName, version);
                
                openRequest.onupgradeneeded = (event) => {
                    ConnectionFactory._createStores(event.target.result);
                }

                openRequest.onsuccess = (event) => {
                    if(!connection) {
                        connection = event.target.result;
                        close = connection.close.bind(connection);
                        connection.close = function() {
                            throw new Error("Voce nao pode fechar diretamente a conexao");
                        }
                    }
                    resolve(connection);
                }

                openRequest.onerror = (event) => {
                    console.log(event.target.error);
                    reject(event.target.error.name);
                }
            })
        }

        static _createStores(connection) {
            stores.forEach((store) => {
                if(connection.objectStoreNames.contains(store)) {
                    connection.deleteObjectStore(store);
                }
                else {
                    connection.createObjectStore(store, {autoIncrement: true});
                };
            });
        }

        static _closeConnection(connection) {
            if(connection) {
                close();
                connection = null;
            }
        }

    }
})();
