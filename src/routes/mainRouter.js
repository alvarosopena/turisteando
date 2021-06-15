const express = require('express');
const router = express.Router();
const controller = require('../controllers/mainController')

const authMiddleware = require('../middlewares/authMiddleware');
const userMiddleware = require('../middlewares/userMiddleware');

router.get('/', controller.index);
router.get('/index-admin', authMiddleware, controller.indexAdmin);
router.get('/contacto', controller.contact);
router.get('/no-permitido', controller.notAllowed);
router.get('/cerra-sesion', controller.closeSession);
router.get('/carrito',  userMiddleware,  controller.carrito);


module.exports = router;