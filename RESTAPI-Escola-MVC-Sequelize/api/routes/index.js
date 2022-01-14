const bodyParser = require('body-parser');
const rotasPessoas = require('./pessoasRoute.js');
const rotasNiveis = require('./niveisRoute.js');
const rotasTurmas = require('./turmasRoute.js');

module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(rotasPessoas, rotasNiveis, rotasTurmas);
}