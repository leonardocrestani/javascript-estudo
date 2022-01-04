const ModeloTabelaCadastro = require('../rotas/pessoas/ModeloTabelaPessoas.js');

ModeloTabelaCadastro.sync().then(() => {
    console.log('Tabela criada com sucesso');
})
.catch((erro) => {
    console.log(erro.message);
});