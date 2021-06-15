
const  express  =  require ( 'express' ) ;
const  router = express.Router ( ) ;
const controller  =  require ( '../controllers/apiController' );


router.get( '/productList' , controller.productList );
router.get( '/productDetail/:id' , controller.productDetail );
router.post( '/productCreate' , controller.productCreate );
router.put( '/productUpdate/:id' , controller.productUpdate );
router.delete('/productDestroy/:id', controller.productDestroy);


module.exports = router