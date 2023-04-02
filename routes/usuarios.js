/*
Ruta: /api/usuarios

*/

//importaciones
const {Router}=require('express')
const {getUsuarios,crearUsuario,actualizarUsuario,borrarUsuario}=require('../controles/usuarios')
const {check}=require('express-validator') //validadores
const {validarCampos}=require('../middlewares/validar-campos'); //validadores
const { validarJWt } = require('../middlewares/validar-jwt');



const router=Router();

//obtener
router.get('/',validarJWt,getUsuarios)

//crear usuario pero necesitamos hacer validaciones
router.post(
    '/',
    [  
        check('nombre','el nombre es obligatorio').not().isEmpty(), //no tiene que estar vacio
        check('email','el Email es obligatorio').isEmail(),
        check('password','el password es obligatorio').not().isEmpty(),
        validarCampos //tiene que ser el ultimo  campo, sino no se activan los validadores de arriba
    ],
    crearUsuario) //campo uno es la ruta, segundo son los middlewares, tercero es el controlador, middlewares lo tengo con npm i express-validator




    router.put( '/:id',
    [    validarJWt,    
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos,     
    ],
    actualizarUsuario
);


router.delete( '/:id', validarJWt,borrarUsuario);





module.exports=router