
/*
    ruta: api/todo/:busqueda

*/



const {Router}=require('express')
const {check}=require('express-validator') //validadores
const {validarCampos}=require('../middlewares/validar-campos'); //validadores
const {getTodo,getDocumentoColeccion}= require('../controles/busquedas')
const {validarJWt}=require('../middlewares/validar-jwt'); //validadores

const router=Router();









router.get(
    '/:busqueda',
    [validarJWt,validarCampos],
    getTodo)



router.get(
    '/coleccion/:tabla/:busqueda',
    validarJWt,
    getDocumentoColeccion)











module.exports=router