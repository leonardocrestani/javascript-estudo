class Tabelas {
    init(conexao) {
        console.log("Tabelas foram chamadas");
        this.conexao = conexao;
        this.criarAtendimentos();
        this.criarPets();
    }

    criarAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id INT NOT NULL AUTO_INCREMENT, cliente VARCHAR(11) NOT NULL, pet VARCHAR(20), servico VARCHAR(20) NOT NULL, dataAgendamento DATETIME NOT NULL, dataCriacao DATETIME NOT NULL, status VARCHAR(20) NOT NULL, observacoes TEXT, PRIMARY KEY(id))'

        this.conexao.query(sql, (erro) => {
            if(erro) {
                console.log(erro);
            }
            else {
                console.log("Tabela atendimentos criada com sucesso");
            }
        });
    }

    criarPets() {
        const sql = 'CREATE TABLE IF NOT EXISTS Pets (id INT NOT NULL AUTO_INCREMENT, nome VARCHAR(50), imagem VARCHAR(200), PRIMARY KEY(id))'

        this.conexao.query(sql, (erro) => {
            if(erro) {
                console.log(erro);
            }
            else {
                console.log("Tabela pet foi criada com sucesso");
            }
        })
    }
}

module.exports = new Tabelas;