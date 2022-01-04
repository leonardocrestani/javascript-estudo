const conexao = require('../../infraestrutura/database/conexao.js');
const moment = require('moment');

class Pessoa {

    adiciona(pessoa) {
        const dataCriacao = moment().format();
        const dataAtualizacao = moment().format();
        const objetoDatado = Object.assign({}, pessoa, {dataCriacao}, {dataAtualizacao});
        console.log(objetoDatado);
        const sql = 'INSERT INTO cadastro.pessoas SET ?';
        return new Promise((resolve, reject) => {
            conexao.query(sql, objetoDatado, (erro, resultado) => {
                if(erro) {
                    reject(erro);
                }
                else {
                    // resultadoInsercao devolve o objeto inteiro que foi inserido no bd
                    resolve(objetoDatado);
                }
            });
        });
    }

    verificaExistencia(dados) {
        const sql = `SELECT pessoa FROM cadastro.pessoas WHERE email = ? and senha = ?`;
        return new Promise((resolve, reject) => {
            conexao.query(sql, dados, (erro, resultado) => {
                if(erro) {
                    reject(erro);
                }
                else {
                    resolve(resultado);
                }
            });
        });
    }

    listaTodas() {
        const sql = 'SELECT * FROM cadastro.pessoas';
        return new Promise((resolve, reject) => {
            conexao.query(sql, (erro, resultado) => {
                if(erro) {
                    reject(erro);
                }
                else {
                    resolve(resultado);
                }
            });
        }); 
    }

}

module.exports = Pessoa;