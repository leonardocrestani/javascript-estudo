const ModeloTabelaCadastro = require('../rotas/pessoas/ModeloTabelaPessoas.js');
const ModeloTabelaTeste = require('../rotas/pessoas/ModeloTabelaTeste.js');

let promiseTabelaCadastro = ModeloTabelaCadastro.sync();
let promiseTabelaTeste = ModeloTabelaTeste.sync();

Promise.all([promiseTabelaCadastro, promiseTabelaTeste]).then(() => {
    console.log("Tabelas 'CADASTRO' e 'TESTE' foram chamadas");
})
.catch((erro) => {
    console.log(erro.message);
});