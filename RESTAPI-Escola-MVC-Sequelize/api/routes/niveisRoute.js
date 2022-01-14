const NivelController = require('../controllers/NivelController.js');
const router = require('express').Router();

router.get('/niveis', NivelController.pegaTodosOsNiveis);
router.get('/niveis/:idNivel', NivelController.pegaUmNivel);
router.post('/niveis', NivelController.criaUmNivel);
router.put('/niveis/:idNivel', NivelController.atualizaNivel);
router.delete('/niveis/:idNivel', NivelController.deletaNivel);

module.exports = router;