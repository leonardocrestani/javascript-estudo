class Tabelas {
    init(conexao) {
        console.log("Conexao chamada para criar tabela");
        this.conexao = conexao;
        this.criaTabelaPessoa();
    }

    criaTabelaPessoa() {
        const sql = 'CREATE TABLE IF NOT EXISTS pessoas (id INT NOT NULL auto_increment, nome VARCHAR(255) NOT NULL, sobrenome VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, senha VARCHAR(255) NOT NULL, dataCriacao DATETIME NOT NULL, dataAtualizacao DATETIME NOT NULL, PRIMARY KEY (id))'
        this.conexao.query(sql, (erro) => {
            if(erro) {
                throw new Error("Nao foi possivel criar a tabela 'Pessoa'");
            }
            else {
                console.log("Tabela criada caso nao exista");
            }
        });
    }
}

module.exports = new Tabelas;