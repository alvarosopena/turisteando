const db = require ("../../database/models");


module.exports = {
    
    index: (req, res) => {
        db.Products.findAll()
        .then(products => {
            products.forEach(producto => {
                if (producto.image == "")
                producto.image = 'default.png'

            });
           return res.render('index', { products })
        })
           
        .catch((errors) => {
            console.log(errors);
               res.send("Ha ocurrido un error")
        });


    },

    indexAdmin: (req, res) => {
        res.render("index-admin");
    },

    contact: (req, res) => {
        res.render("contact");
        
    },

    notAllowed: (req, res) => {
        res.render("notAllowed");
        
    },

    closeSession: (req, res) => {
        res.render("closeSession");
        
    },

    carrito: (req, res) => {
        res.render("products/carrito");
        
    },
    
    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/');
    },  
 
};