// 'database' traz todos os modelos criados pois o index.js pega todos
// para acessar cada modelo acessamos com 'database.nome_do_modelo'
const database = require('../models/index.js');

class PessoaController {
    static async pegaTodasAsPessoas(req, res) {
        try {
            const todasPessoas = await database.Pessoas.findAll({raw: true});
            return res.status(200).json(todasPessoas);
        }
        catch(erro) {
            return res.status(500).json({mensagem: erro.message});
        }
    }

    static async pegaUmaPessoa(req, res) {
        try {
            const id = req.params.idPessoa;
            const pessoa = await database.Pessoas.findOne({where: {id: id}});
            return res.status(200).json(pessoa);
        }
        catch(erro) {
            return res.status(500).json({mensagem: erro.message});
        }
    }

    static async criaPessoa(req, res) {
        try {
            const dados = req.body;
            const pessoa = await database.Pessoas.create(dados);
            return res.status(201).json(pessoa);
        }
        catch(erro) {
            return res.status(500).json({mensagem: erro.message});
        }
    }

    static async atualizaPessoa(req, res) {
        try {
            const id = req.params.idPessoa;
            const dados = req.body;
            await database.Pessoas.update(dados, {where: {id: id}});
            const pessoaAtualizada = await database.Pessoas.findOne({where: {id: id}});
            return res.status(200).json(pessoaAtualizada);
        }
        catch(erro) {
            return res.status(500).json({mensagem: erro.message});
        }
    }

    static async deletaPessoa(req, res) {
        try {
            const id = req.params.idPessoa;
            await database.Pessoas.destroy({where: {id: id}});
            res.status(200).json({mensagem: `Pessoa com id: ${id} deletada com sucesso`});
        }
        catch(erro) {
            return res.status(500).json({mensagem: erro.message});
        }
    }

    static async pegaUmaMatricula(req, res) {
        try {
            const idPessoa = req.params.idPessoa;
            const idMatricula = req.params.idMatricula;
            const matricula = await database.Matriculas.findOne({where: {id: idMatricula, estudante_id: idPessoa}});
            return res.status(200).json(matricula);
        }
        catch(erro) {
            return res.status(500).json({mensagem: erro.message});
        }
    }

    static async criaMatricula(req, res) {
        try {
            const idPessoa = req.params.idPessoa;
            const dadosMatricula = req.body;
            const dados = Object.assign({}, {estudante_id: idPessoa}, dadosMatricula);
            const novaMatricula = await database.Matriculas.create(dados);
            return res.status(201).json(novaMatricula);
        }
        catch(erro) {
            return res.status(500).json({mensagem: erro.message});
        }
    }

    static async atualizaMatricula(req, res) {
        try {
            const idPessoa = req.params.idPessoa;
            const idMatricula = req.params.idMatricula;
            const dados = req.body;
            await database.Matriculas.update(dados, {where: {id: idMatricula, estudante_id: idPessoa}});
            const matriculaAtualizada = await database.Matriculas.findOne({where: {id: idMatricula, estudante_id: idPessoa}});
            return res.status(200).json(matriculaAtualizada);
        }
        catch(erro) {
            return res.status(500).json({mensagem: erro.message});
        }
    }

    static async deletaMatricula(req, res) {
        try {
            const idPessoa = req.params.idPessoa;
            const idMatricula = req.params.idMatricula;
            await database.Matriculas.destroy({where: {id: idMatricula, estudante_id: idPessoa}});
            res.status(200).json({mensagem: `Matricula com id: ${idMatricula} pertencente ao estudante: ${idPessoa} deletada com sucesso`});
        }
        catch(erro) {
            return res.status(500).json({mensagem: erro.message});
        }
    }
}

module.exports = PessoaController;