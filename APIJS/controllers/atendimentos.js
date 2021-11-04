const Atendimento = require('../models/atendimentos.js');

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista().then((resultados) => {
            res.status(200).json(resultados);
        }).catch(erros => {
            res.status(400).json(erros);
        });
    });

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);

        Atendimento.buscaPorId(id, res);
    });

    app.post('/atendimentos', (req, res) => {
        console.log(req.body);
        Atendimento.adiciona(req.body).then((atendimentoCadastrado) => {
            res.status(201).json(atendimentoCadastrado)
        }).catch((erros) => {
            res.status(400).json(erros);
        });
    });

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body; 
        Atendimento.altera(id, valores, res);
    });

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Atendimento.deleta(id, res);
    });
}