const path = require('path');
const express = require('express');
const app = express();
const methodOverride = require('method-override'); //npm install method-override --save para usar metodo put y delete
const fs = require("fs") // fileSync (readFileSync(), Es un método que trae el paquete nativo file system que nos permite recuperar datos de un archivo para poder usarlos.
                        //Para poder decodificar los datos que el método devuelve es fundamental pasarle un segundo parámetro aclarando el tipo de encoding. "utf-8" ej.
//
const session = require('express-session'); //npm instal express-session
const auth = require('./src/middlewares/auth');
const maintenance = require('./src/middlewares/maintenance');

const cookieParser = require('cookie-parser') // npm instal cookie-parser --save para utilizar cookies
const cors = require ("cors")

app.use(cors())

// Configuro el directorio de recursos estáticos
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'src/views');


// Sessiones y cookies
app.use(session({
  secret: 'Mi sitio',
  resave: false, // no vuelve a guardar si no hay cambios
  saveUninitialized: true, // guarda sessiones aunque todavía no haya datos
}));
app.use(auth);
//////

// Formularios
app.use(express.urlencoded({ extended: false }));//De esta forma le estamos aclarando a la aplicación que todo aquello que llegue desde un formulario, queremos capturarlo en forma de objeto literal.
app.use(express.json());                         // Y a su vez, tener la posibilidad de convertir esa información en un formato JSON, en caso de necesitarlo
app.use(methodOverride('_method'));             //Para poder sobreescribir el método original y poder implementar los métodos PUT o DELETE

//cookieParser
app.use(cookieParser()); 
const recordameMiddleware = require('./src/middlewares/recordameMiddleware');
app.use(recordameMiddleware); 

//app.get('/', (req, res) => {
  //  res.sendFile(path.join(__dirname, 'src/views/index.html'));
//})


//Rutas
//Main
const mainRouter = require('./src/routes/mainRouter');
app.use('/', mainRouter);


//Productos
const productsRouter = require('./src/routes/productsRouter');
app.use('/', productsRouter);
app.use('/crear', productsRouter);
app.use('/products',  productsRouter);

//Usuarios
const usersRouter = require('./src/routes/usersRouter');
app.use('/', usersRouter);
app.use('/user', usersRouter);
app.use('/users', usersRouter);



//Api products
const apiRouter = require('./src/routes/apiRouter');
app.use('/api', apiRouter);

//Api users
const apiUserRouter = require('./src/routes/apiUserRouter');
app.use('/api', apiUserRouter); 

//Api terceros
const moneyExchangeMiddleware = require('./src/middlewares/APIs/moneyExchange')
//const apiProvincias = require('./src/middlewares/APIs/apiProvincias')

app.use(moneyExchangeMiddleware)
//app.use(apiProvincias)


//Not found
app.use((req,res,next)=> {
  res.status(404).render("404")
});


// Iniciar el servidor
app.listen(3000, () => console.log('El servidor está corriendo en el puerto 3000.'));


