
/*
    ruta: api/todo/:busqueda

*/



const {Router}=require('express')

const {validarJWt}=require('../middlewares/validar-jwt'); //validadores
const {fileUpload,retornaImgen}= require('../controles/uploads')
const ExpressfileUpload = require('express-fileupload') //el midleware de la libreria


const router=Router();
router.use(ExpressfileUpload());

router.put('/:tipo/:id',validarJWt,fileUpload)
router.get('/:tipo/:foto',retornaImgen)













module.exports=router