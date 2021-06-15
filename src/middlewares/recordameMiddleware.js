const db = require('../../database/models');

/*  */function recordameMiddleware (req, res, next){
    next();

    if(req.cookies.recordame != undefined && req.session.user == undefined){

            // Verifico que el usuario exista
            let user = db.Users.findOne({ where:{email: req.cookies.recordame}});
                
    }
  
                    req.session.user

};


module.exports = recordameMiddleware; 