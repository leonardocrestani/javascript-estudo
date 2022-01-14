const router = require('express').Router();
const TurmaController = require('../controllers/TurmaController.js');

router.get('/turmas', TurmaController.pegaTodasAsTurmas);
router.get('/turmas/:idTurma', TurmaController.pegaUmaTurma);
router.post('/turmas', TurmaController.criaTurma);
router.put('/turmas/:idTurma', TurmaController.atualizaTurma);
router.delete('/turmas/:idTurma', TurmaController.deletaTurma);

module.exports = router;