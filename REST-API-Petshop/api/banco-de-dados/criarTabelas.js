const TabelaFornecedor = require('../rotas/fornecedores/ModeloTabelaFornecedor.js');

TabelaFornecedor.sync()
.then(() => {
    console.log("Tabela criada com sucesso");
})
.catch((erro) => {
    console.log(erro);
});