/*
    Path: /api/login

*/
const {Router}=require('express')
const {login}=require('../controles/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const {check}=require('express-validator') //validadores

const router=Router();



router.post('/',
    [
        check('email','el Email es obligatorio').isEmail(),
        check('password','el password es obligatorio').not().isEmpty(),
        validarCampos//metodo generico
    ],
    login
)




module.exports=router //exportar el modulo