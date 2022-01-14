const database = require('../models/index.js');

class NivelController {
    static async pegaTodosOsNiveis(req, res) {
        try{
            const resultado = await database.Niveis.findAll({raw: true});
            return res.status(200).json(resultado);
        }
        catch(erro) {
            return res.status(500).json({mensagem: erro.message});
        }
    }

    static async pegaUmNivel(req, res) {
        try {
            const id = req.params.idNivel;
            const nivel = await database.Niveis.findOne({where: {id: id}});
            return res.status(200).json(nivel);
        }
        catch(erro) {
            return res.status(500).json({mensagem: erro.message});
        }
    }

    static async criaUmNivel(req, res) {
        try {
            const dados = req.body;
            const novoNivel = await database.Niveis.create(dados);
            res.status(201).json(novoNivel);
        }
        catch(erro) {
            return res.status(500).json({mensagem: erro.message});
        }
    }

    static async atualizaNivel(req, res) {
        try {
            const id = req.params.idNivel;
            const dados = req.body;
            await database.Pessoas.update(dados, {where: {id: id}});
            const nivelAtualizado = await database.Niveis.findOne({where: {id: id}});
            return res.status(200).json(nivelAtualizado);
        }
        catch(erro) {
            return res.status(500).json({mensagem: erro.message});
        }
    }

    static async deletaNivel(req, res) {
        try {
            const id = req.params.idNivel;
            await database.Niveis.destroy({where: {id: id}});
            res.status(200).json({mensagem: `Nivel com id: ${id} deletado com sucesso`});
        }
        catch(erro) {
            return res.status(500).json({mensagem: erro.message});
        }
    }
}

module.exports = NivelController;