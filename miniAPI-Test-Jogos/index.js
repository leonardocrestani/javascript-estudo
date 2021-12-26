const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const jogosFavoritos = [];

app.use(bodyParser.json());

app.post('/api/jogos', (req, res) => {
    const dadosRecebidos = req.body;
    try {
        if(!dadosRecebidos.nome || !dadosRecebidos.plataforma) {
            throw new Error("Os campos nao foram informados corretamente");
        }
        else {
            jogosFavoritos.push(dadosRecebidos);
            res.send(JSON.stringify(dadosRecebidos));
        }
    }
    catch(erro) {
        res.send(JSON.stringify({
            mensagem: erro.message
        }));
    }
});

app.get('/api/jogos', (req, res) => {
    res.send(JSON.stringify(jogosFavoritos));
});

app.listen(3000, () => {
    console.log("API rodando");
});