const  express  =  require ( 'express' ) ;
const  router = express.Router ( ) ;
const controller  =  require ( '../controllers/apiUserController' );


router.get( '/UserList' , controller.UserList );
router.get( '/UserDetail/:id' , controller.UserDetail );
router.post( '/UserCreate' , controller.UserCreate );
router.put( '/UserUpdate/:id' , controller.UserUpdate );
router.delete('/UserDestroy/:id', controller.UserDestroy); 


module.exports = router