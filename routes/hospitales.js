
/*
/api/hospitales
*/

const {Router}=require('express')

const {check}=require('express-validator') //validadores
const {validarCampos}=require('../middlewares/validar-campos'); //validadores
const {validarJWt}=require('../middlewares/validar-jwt'); //validadores
const { 
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales,
    
}=require('../controles/hospitales') //validadores



const router=Router();

//obtener
router.get('/',getHospitales)






//crear usuario pero necesitamos hacer validaciones
router.post(
    '/',
    [
    validarJWt,
    check('nombre','El nombre del hospital es necesario').not().isEmpty(), //estos son los campos que tiene que tener el json y la comprobacion para despues verlo en validar campos
    validarCampos
    ],crearHospitales
    ) //campo uno es la ruta, segundo son los middlewares, tercero es el controlador, middlewares lo tengo con npm i express-validator




    router.put( '/:id',
    [   
           
    ],
    actualizarHospitales
);



router.delete( '/:id',borrarHospitales)







module.exports=router