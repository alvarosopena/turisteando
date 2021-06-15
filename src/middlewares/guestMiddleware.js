/* si hay usuario, que cierre sesión */

function guestMiddleware (req, res, next){
    if (req.session && req.session.user){
        res.render("closeSession")  
           
        } next()
    } 

 

module.exports = guestMiddleware