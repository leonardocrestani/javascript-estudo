const moment = require('moment');
const conexao = require('../infraestrutura/conexao.js');

class Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY/MM/DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY/MM/DD HH:MM:SS');

        const dataEValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEValido = atendimento.cliente.lenght >= 5;
        const validacoes = [
            {
                nome: 'data',
                valido: dataEValida,
                mensagem: 'Data deve ser maior ou igual a data de criacao'
            },
            {
                nome: 'cliente',
                valido: clienteEValido,
                mensagem: 'O nome do cliente deve ter 5 ou mais letras'
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length

        if(existemErros) {
            res.status(400).json(erros);
        }
        else {
            const atendimentoDatado = {...atendimento, dataCriacao, data};
            const sql = 'INSERT INTO Atendimentos SET ?'

            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro);
                }
                else {
                    res.status(201).json(atendimento);
                }
            });
        }       
    }

    lista(res) {
        const sql = 'SELECT * FROM Atendimentos';

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            }
            else {
                res.status(200).json(resultados);
            }
        })
    }
    
    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`;

        conexao.query(sql, (erro, resultado) => {
            if(erro) {
                res.status(400).json(erro);
            }
            else {
                const atendimento = resultado[0];
                res.status(200).json(atendimento);
            }
        });
    }

    altera(id, valores, res) {
        if(valores.data) {
            valores.data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY/MM/DD HH:MM:SS');
        }

        const sql = 'UPDATE Atendimentos SET ? WHERE id = ?';

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            }
            else {
                res.status(200).json(...valores, id);
            }
        });
    }

    deleta(id, res) {
        const sql = 'DELETE FROM Atendimentos WHERE id = ?';

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            }
            else {
                res.status(200).json({id: id, mensagem: `O cliente com o id ${id} foi deletado`});
            }
        });
    }
}

module.exports = new Atendimento;