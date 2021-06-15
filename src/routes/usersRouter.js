const express  =  require ( 'express' ) ;
const router = express.Router ( ) ;
const multer = require ('multer');
const path = require('path');path-multer
const controller  =  require ( '../controllers/usersController' );
const fs = require("fs")

///middlewares
const validate = require('../middlewares/usersValidation');
const userMiddleware = require('../middlewares/userMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');



//configuracion de almacenamiento

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '../../public/images/users/'));
    },
    filename: (req, file, callback) => {
         callback(null, 'user-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });




//Vista de usuarios de admin
router.get('/userList', authMiddleware, controller.userList);
router.get('/userList/:id', authMiddleware, controller.detail);

//Procesa el formulario de creación
router.get( '/register', guestMiddleware, controller.register );
router.post('/', upload.single('image'), validate.register, controller.store ); 

//Perfil de usuario, edit y destroy
router.get('/user/:id',userMiddleware, controller.userProfile);
router.get('/edit/:id', userMiddleware, controller.edit);
router.put('/edit/:id', upload.single('image'), validate.update, controller.update);
router.delete('/edit/:id', controller.destroy);

//// login
router.get( '/login', guestMiddleware, controller.login ) ;
router.post('/login', validate.login, controller.authenticate);

router.get('/logout', controller.logout);


//para chequear si hay una sesión abierta

router.get("/check", function (req, res){
    if(req.session.user == undefined){
        res.send("No estas logueado");
    } else { 
        res.send("El usuario logeado es: " + req.session.user.first_name + " " + req.session.user.last_name +". Categoría: " + req.session.user.category_id )
        console.log(req.session)
    }

})


module.exports = router