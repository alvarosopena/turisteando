
module.exports = function (sequelize, dataTypes) {
    let alias = "Products";
    let cols = {
      id: {
        type: dataTypes.INTEGER, 
        autoIncrement: true,
        primaryKey: true,
     
 
      },
      title:{
        type: dataTypes.STRING,
        
        
      },
      price: {
        type: dataTypes.DECIMAL,
       
      },
      image: {
        type: dataTypes.STRING,
        
      },
      description: {
        type: dataTypes.TEXT,
      },

      destacado:{
        type: dataTypes.TEXT,
      }
     /* createdAt: {
        type: dataTypes.DATE,
        allowNull: true
     },
       updatedAt: {
        type: dataTypes.DATE,
        allowNull: true
     },
      deletedAt: {
      type: dataTypes.DATE,
      allowNull: true
     }*/

    
    };

    let config = {
      tableName: "products",
      timestamps: false, //hay que arreglar created_at para q sea true
    //  paranoid: false //deleted_at
    }

    let Products = sequelize.define(alias,cols,config);


// aca falta asociar=========
    
//CAMBIE EL NOMBRE DEL ARCHIVO, SIN LA S FINAL

  return Products;

}