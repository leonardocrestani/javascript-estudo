const router = require('express').Router();
const PessoaController = require('../controllers/PessoaController.js');

// rotas pessoas
router.get('/pessoas', PessoaController.pegaTodasAsPessoas);
router.get('/pessoas/:idPessoa', PessoaController.pegaUmaPessoa);
router.post('/pessoas', PessoaController.criaPessoa);
router.put('/pessoas/:idPessoa', PessoaController.atualizaPessoa);
router.delete('/pessoas/:idPessoa', PessoaController.deletaPessoa);

// rotas matriculas que dependem de pessoas
router.get('/pessoas/:idPessoa/matriculas/:idMatricula', PessoaController.pegaUmaMatricula);
router.post('/pessoas/:idPessoa/matriculas', PessoaController.criaMatricula);
router.put('/pessoas/:idPessoa/matriculas/:idMatricula', PessoaController.atualizaMatricula);
router.delete('/pessoas/:idPessoa/matriculas/:idMatricula', PessoaController.deletaMatricula);

module.exports = router;