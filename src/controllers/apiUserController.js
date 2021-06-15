const db = require("../../database/models");

module.exports = {

    UserList(req, res){
        db.Users.findAll()
            .then(users => {
                res.
                    status(200)
                    .json({
                        data: users,
                        status:'success'
                    })
            })
            .catch(error => {
                res
                    .status(500)
                    .json({
                        status:'error',
                        error,
                    })
            })
        },


    UserDetail(req, res){
            const { id } = req.params

            db.Users.findByPk(id)
                .then(user => {
                    if(!user){
                        return res.status(404)
                        .json({
                                status:'not_found'
                        })
                    }
                    res.status(200)
                        .json({
                            data:user,
                            status:'success'
                        })
                })

                .catch(error => {
                      res
                        .status(500)
                        .json({
                            status:'error',
                            error
                        })
                })
    },


    UserCreate(req, res){
        const body = req.body
        console.log(req.body)
        db.Users.create(body)
        .then(user => {
            res.status(200)
                .json({
                    data: user,
                    status:'success'
                })
        })
        .catch(error => {
            res
              .status(500)
              .json({
                  status:'error',
                  error
              })
      })
    },

    UserUpdate(req, res){
        const body = req.body
        db.Users.update(body, {
            where: {
                id: req.params.id
            }
           

        })

        
        .then(() => {
            db.Users.findByPk(req.params.id)
            .then(user => {
                res.status(201)
                .json({
                    data: user,
                    status:'success'
                })
            })
        })
    },

    UserDestroy(req, res){
        const body = req.body
        db.Users.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(() => {
                res.status(201)
                .json({
                    status:'success'
                })
            })
    },



} 