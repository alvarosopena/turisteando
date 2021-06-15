const fs = require('fs');
const path = require('path');
//const jsonTable = require('../database/jsonTable');
//const usersTable = jsonTable('users');

//C
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs'); //npm install bcryptjs 

//DATABASE
let db = require ("../../database/models")

module.exports = {
    ///LISTADO DE USUARIOS Y DETAIL POR GET
    userList:(req, res) => {
        db.Users.findAll()
            .then(users => {
                return res.render('users/userList', { users })
        })
           
            .catch((errors) => {
                console.log(errors);
                    res.send("Ha ocurrido un error")
        });

        //JSON
         /*let users = usersTable.all()
         res.render ("users/userList", {
            title: 'Listado de usuarios', 
            users})*/
    },

    detail:(req, res) => {
        let id = req.params.id
        db.Users.findOne({ where: { id } })
            .then(users => {
                res.render('users/detail', { users })
            })
            .catch((errors) => {
                console.log(errors);
                res.send("Ha ocurrido un error")
            });
       /* res.render ("users/detail", {
        })*/
    }, 

    ///LOGIN Y AUTENTICACION
    login:(req, res)  =>  {
     /*   /*  validacion solo de este campo y en el controller en value */
        /* let errors = validateResult(req);
        if (errors.isEmpty()){
            let user = req.body;
        }
            else {
                res.render('users/login', {old: req.body});
            } */ 

        res.render ('users/login') 
    },


    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/');
    },  
    
    authenticate: async (req, res) => {
        // Validamos los datos del login
        let errors = validationResult(req);
            console.log(errors.mapped());
    
        // Si no hay errores
        if (errors.isEmpty()) {
            // Verifico que el usuario exista
            let user = await db.Users.findOne({ where:{email: req.body.email}});
                
            //console.log(user.dataValues.password)
            //JSON let user = usersTable.findByField('email', req.body.email);
    
            // Si el usuario existe
            if (user) {
                // La contraseña es la correcta
                //console.log(req.body.password)
                if (bcrypt.compareSync(req.body.password, user.password)) {
               // if ((req.body.password == user.dataValues.password)) { sin bcrypt
                    req.session.auth = true
                    req.session.user = user;    


                //cookie
                    if(req.body.recordarme != undefined){
                        res.cookie('recordame', user.email, { maxAge: 60000 })
                    }
 
                    /* return res.redirect('/user/' + user.dataValues.id) */ /* redirecciona a perfil de usuario */
                    return res.redirect("/") 
                // Si la contraseña es incorrecta
                } else {
                    let errors = {
                        password: {
                            msg: 'La contraseña es incorrecta',
                            param: 'email',
                            location: 'body'
                        }
                    }
                    return res.render('users/login', { errors: errors, old: req.body });
                }
            // Si el usuario no existe
            } else {
                let errors = {
                    email: {
                        msg: 'El email no existe en nuestros registros',
                        param: 'email',
                        location: 'body'
                    }
                }
                return res.render('users/login', { errors: errors, old: req.body });
            }

                 // Si hay errores
            } else {
                // Renderizo el formulario nuevamente con los errors y los datos completados
                return res.render('users/login', { errors: errors.mapped(), old: req.body });
            }
    
    },

     ////////REGISTER GET     
    register:(req, res) => {
        res.render ("users/register", {
    
        })
    }, 

    ////////STORE POST
    store: (req, res) => {
        // Valido los campos - aca ver req.file
        let errors = validationResult(req);
        // Me fijo si no hay errores
        
        if (errors.isEmpty()) {
             // Si no hubo errores, busco si existe ese usuario		
		    db.Users.findOne({
                where: {
                     email: req.body.email
                }

            })
                .then( user => {
                    if (user) {
                          return res.render ('users/register',
                    { 
                        errors:{
                            email:{
                            msg:'Este usuario ya está registrado'
                            }
                        },
                     old: req.body
                    });
                 }
                })
             .catch(error => {console.log(error)});

            // Generamos el nuevo usuario
            let user = req.body;
            if (req.file) {
                user.image = req.file.filename;
            } 

            user.password = bcrypt.hashSync(user.password);
            //user.password = user.password // sin bcrypt

            console.log(req.body)
            //Si me llegó una imagen la guardo, sino pongo una por default (hablando del nombre y no la imagen en si)
            let image = (req.body.image) ? req.body.image : 'default.png';
            // Creo el usuario
            db.Users.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name ,
                email: req.body.email,
                password: req.body.password ,
                image: image,
                country: req.body.country,
                category_id: req.body.category_id

            })
            .then((user) => {
               // console.log(user.dataValues.id)
                req.session.auth = true  /* DESPUES DE INICIAR SESIÓN SE QUEDA EL USER LOGEADO */
                req.session.user = user; 
               return res.redirect('user/' + user.dataValues.id)
            })
            .catch((errors) => {
                console.log(errors);
                res.send("Ha ocurrido un error")
            });

            //USUARIO CREADO - REDIRECT INDEX 
            //let userId = usersTable.create(user); JSON
            
            //NO REDIRECCIONA A ID 
            //return await res.redirect('/userList/' + {user}) 
    
            // Si hay errores    
            } else {
            // Renderizo el formulario nuevamente con los errors y los datos completados
            return res.render('users/register', { errors: errors.mapped(), old: req.body });
        }
    },
    ///EDIT GET
    edit: (req, res) => {
        let id = req.params.id
        db.Users.findOne({ where: { id } })
            .then(users => {
                res.render('users/edit', { users })
            })
            .catch((errors) => {
                console.log(errors);
                res.send("Ha ocurrido un error")
            });

        //VIEJO
       /* let user = usersTable.find(req.params.id);
        res.render('users/edit', { user });
        */ 
    },

    ///EDIT POST
    update: (req, res) => {
        //Si me llegó una imagen la guardo, sino pongo una por default (hablando del nombre y no la imagen en si)
      //  let image = (req.body.image) ? req.body.image : 'default.png';
       // user.password = bcrypt.hashSync(user.password);

        db.Users.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name ,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
            image: req.file ? req.file.filename : req.body.image,
            country: req.body.country,
            category_id: req.body.category_id

        }, {
            where: {
                id: req.params.id
            }
        })
        .then((users) => {
                let id = req.params.id
                res.redirect('/user/' + id)
        })

        .catch((errors) => {
            console.log(errors);
            res.send("Ha ocurrido un error")
        });

           /* let user = req.body;
            user.id = Number(req.params.id);
    
            // Si viene una imagen nueva la guardo
            if (req.file) {
                user.image = req.file.filename;
            // Si no viene una imagen nueva, busco en base la que ya había
            } else {
                oldUser = usersTable.find(user.id);
                user.image = oldUser.image;
            }
            let userId = usersTable.update(user);
    
            res.redirect('/users/' + userId);*/
    },

    ///EDIT DELETE
    destroy: (req, res) => {

            const id = req.params.id
            db.Users.destroy( {
                where : {
                    id
                }
            })
            .then ( () => { 
                res.redirect ("/")
            })
            
            //JSON
            /* let users = usersTable.all()
            usersTable.delete(req.params.id);
            res.redirect("users/userList", {
                title: 'Listado de usuarios', 
                users
            })*/
    },

    userProfile:(req, res) => {
            let id = req.params.id
            db.Users.findOne({ where: { id } })
                .then(users => {
                    res.render('users/detail', { users })
                })
                .catch((errors) => {
                    console.log(errors);
                    res.send("Ha ocurrido un error")
                });
    },

    notAllowed: (req, res)=>{
            return res.render("/notAllowed")
    },
  
    }


