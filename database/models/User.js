//const { FOREIGNKEYS } = require("sequelize/types/lib/query-types");

//CAMBIE EL NOMBRE DEL ARCHIVO, SIN S


module.exports = function(sequelize, dataTypes){
    let alias = "Users"
    let cols ={
        id :{
            type: dataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        first_name :{
            type: dataTypes.STRING,
            allowNull: false,
        },
        last_name :{
            type: dataTypes.STRING,
            allowNull: false,
        },
        email :{
            type: dataTypes.STRING,
            allowNull: false,
        },
        password :{
            type: dataTypes.STRING,
            allowNull: false,
        },
        country :{
            type: dataTypes.STRING,
            allowNull: false,
        },
        image:{
            type: dataTypes.STRING
        },
        category_id: {
          type: dataTypes.INTEGER,
        }    ,
     

       /*  createdAt: {
            type: dataTypes.DATE,
          },
          updatedAt: {
            type: dataTypes.DATE,
          },
          deletedAt: {
            type: dataTypes.DATE,
          },
          */
         
    };

    let config = {
        tableName: "users",
        timestamps: false,
      /*  paranoid: true,*/
       underscored: true
      }

    let Users = sequelize.define(alias,cols, config);

    Users.associate = models => {
       Users.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'category_id'
        })
    }

//    Users.associate = function (models){
  //      Users.belongsTo(models.User_id,{
   //         as: "User",
    //        ForeignKey: "user_id",
     //   })
  //  }
 
  return Users;
}
