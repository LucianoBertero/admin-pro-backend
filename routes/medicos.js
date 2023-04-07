
/*
/api/medicos
*/

const {Router}=require('express')
const {check}=require('express-validator') //validadores
const {validarCampos}=require('../middlewares/validar-campos'); //validadores
const { validarJWt}=require('../middlewares/validar-jwt'); //validadores
const { 
    getMedicos,
    crearMedicoss,
    actualizarMedicos,
    borrarMedicos
}
=require('../controles/medicos') //validadores

const router=Router();

//obtener
router.get('/',getMedicos)

//crear usuario pero necesitamos hacer validaciones
router.post(
    '/',
    [  
      validarJWt,
      check('nombre','El nombre del medico es obligatorio').not().isEmpty(),
      check('hospital','El id del hospital debe de ser valido').isMongoId(),
      validarCampos
    ],
    crearMedicoss
    ) //campo uno es la ruta, segundo son los middlewares, tercero es el controlador, middlewares lo tengo con npm i express-validator


router.put( '/:id',
    [   
        validarJWt,
        check('nombre', 'el nombre es requerido').not().isEmpty(),
        check('hospital',"el id del hospital es requerido").isMongoId(),
        validarCampos
    ],
        actualizarMedicos   
);



router.delete( '/:id',[
    validarJWt

],borrarMedicos)







module.exports=router