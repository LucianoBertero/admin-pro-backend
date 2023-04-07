/*
    Path: /api/login

*/
const {Router}=require('express')
const {login,googleSingIn,renewToken}=require('../controles/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const {check}=require('express-validator') //validadores
const {validarJWt}= require('../middlewares/validar-jwt')

const router=Router();



router.post('/',
    [
        check('email','el Email es obligatorio').isEmail(),
        check('password','el password es obligatorio').not().isEmpty(),
        validarCampos//metodo generico
    ],
    login
)



router.post('/google',
    [     
        check('token','el token de Google es obligatorio').not().isEmpty()
        //metodo generico
    ],
    googleSingIn
)


router.get('/renew',
    [     
        validarJWt
    ],
    renewToken
)





module.exports=router //exportar el modulo