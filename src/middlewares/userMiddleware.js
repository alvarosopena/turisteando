/* Si no hay usuario, que inicie sesión */
function userMiddleware (req, res, next){
    if (req.session.user==undefined){
        
        res.render('users/login') 
         
            
        
    }

     next()
}



module.exports = userMiddleware
