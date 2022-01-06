const modelos = [
    require('../rotas/fornecedores/ModeloTabelaFornecedor.js'),
    require('../rotas/fornecedores/produtos/ModeloTabelaProdutos.js')
]

console.log(modelos); // ['fornecedor', 'produto']

async function criarTabelas() {
    for(let contador=0; contador<modelos.length; contador++) {
        const modelo = modelos[contador];
        await modelo.sync();
    }
}

criarTabelas();