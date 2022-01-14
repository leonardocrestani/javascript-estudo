const database = require('../models/index.js');

class TurmaController {
    static async pegaTodasAsTurmas(req, res) {
        try {
            const resultado = await database.Turmas.findAll({raw: true});
            res.status(200).json(resultado);
        }
        catch(erro) {
            res.status(500).json({mensagem: erro.message});
        }
    }

    static async pegaUmaTurma(req, res) {
        try {
            const id = req.params.idTurma;
            const turma = await database.Turmas.findOne({where: {id: id}});
            return res.status(200).json(turma);
        }
        catch(erro) {
            return res.status(500).json({mensagem: erro.message});
        }
    }

    static async criaTurma(req, res) {
        try {
            const dados = req.body;
            const turma = await database.Turmas.create(dados);
            return res.status(201).json(turma);
        }
        catch(erro) {
            return res.status(500).json({mensagem: erro.message});
        }
    }

    static async atualizaTurma(req, res) {
        try {
            const id = req.params.idTurma;
            const dados = req.body;
            await database.Turmas.update(dados, {where: {id: id}});
            const turmaAtualizada = await database.Turmas.findOne({where: {id: id}});
            return res.status(200).json(turmaAtualizada);
        }
        catch(erro) {
            return res.status(500).json({mensagem: erro.message});
        }
    }

    static async deletaTurma(req, res) {
        try {
            const id = req.params.idTurma;
            await database.Turmas.destroy({where: {id: id}});
            res.status(200).json({mensagem: `Turma com id: ${id} deletada com sucesso`});
        }
        catch(erro) {
            return res.status(500).json({mensagem: erro.message});
        }
    }

}

module.exports = TurmaController;