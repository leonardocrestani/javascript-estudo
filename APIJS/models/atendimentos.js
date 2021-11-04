const moment = require('moment');
const axios = require('axios');
const conexao = require('../infraestrutura/database/conexao.js');
const repositorio = require('../repositorios/atendimentos.js');

class Atendimento {

    constructor() {
        this.dataEValida = ({data, dataCriacao}) => moment(data).isSameOrAfter(dataCriacao);
        this.valida = (parametros) => {
            return this.validacoes.filter(campo => {
                const {nome} = campo.nome;
                const parametro = parametros[nome];
                return !campo.valido(parametro);
            });
        }
        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataEValida,
                mensagem: 'Data deve ser maior ou igual a data de criacao'
            }
        ];
    }

    adiciona(atendimento) {
        const dataAgora = moment();
        const dataCriacao = dataAgora.format();
        const data = moment(atendimento.data, 'DD/MM/YYYY HH:mm').format();


        const parametros = {
            data: {data, dataCriacao}
        }
        const erros = this.valida(parametros);
        const existemErros = erros.length

        if(existemErros) {
            return new Promise((resolve, reject) => {
                reject(erros);
            });
        }
        else {
            const atendimentoDatado = {...atendimento, dataCriacao, data};
            return repositorio.adiciona(atendimentoDatado).then((resultados) => {
                const id = resultados.insertId;
                return {...atendimento, id};
            });
        }       
    }

    lista() {
        return repositorio.lista();
    }
    
    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`;

        conexao.query(sql, async(erro, resultado) => {
            const atendimento = resultado[0];
            const cpf = atendimento.cliente;
            if(erro) {
                res.status(400).json(erro);
            }
            else {
                const {data} = await axios.get(`http://localhost:8082/${cpf}`);
                atendimento.cliente = data;
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