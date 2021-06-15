/* si hay usuario pero es cat 2 o si no hay usuario -> not allowed */

function authMiddleware (req, res, next){
    if(req.session.user && req.session.user.category_id === '2' || !req.session.user){
        res.render ("notAllowed")
    } 
    next();
}


    
     

module.exports = authMiddleware




