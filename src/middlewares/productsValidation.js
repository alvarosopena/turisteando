/* 
esta directamente en product routes */
/* const { body } = require('express-validator')
const validateCreateProducts = [ 
        body('title').notEmpty().withMessage('El campo debe contener el titulo'),
        body('description').notEmpty().withMessage('El campo debe contener una decripcion del producto'),
        body('price').notEmpty().withMessage('El campo debe tener el precio'),
        body('image').custom((value, { req }) => {
            let file = req.file;
            let aceptedExtensions = ['.jpg', 'png', '.gif']; 

            if (!file) {
            throw new Error ('Debes subir una imagen');
            }
            else {
                let fileExtensions = path.extname(file.originalname);
                if(!aceptedExtensions.includes(fileExtensions)){
                    throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
                }
            }
            return true;
            })
            
];

 */