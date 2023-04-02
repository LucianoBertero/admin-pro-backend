

const Usuario=require('../models/usuario')
const bcrypt= require('bcryptjs'); //libreria para encriptar la contraseña del usuario, importada con npm i bcryptjs
const {generarJWT}=require('../helpers/jwt')
const {response}=require('express');
const {validationResult}=require('express-validator')


const getUsuarios=async (req,res)=>{

    const usuario=  await Usuario.find({},'nombre email role google')   
    res.json({
        ok:true,
        usuario,
        uid:req.uid   
    })
}


//hay que leer el body que se manda por la api, en la misma tambien se verifica si el email ya existe
const crearUsuario=async (req,res=response)=>{
    //desestructuracion de los campos del body
    // extraemos valores para verificar posteriormente
       const {email,password,nombre}=req.body;


    try{
        //verificar si el email existe, si no existe el mismo tirara error
        const existeEmail=await Usuario.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg:"el correo ya esta registrado"
            })
        }
        //aca como existe y paso el try se devuelve el usuario
        const usuario=new Usuario(req.body);
        //encruptar contraseña
        const salt=bcrypt.genSaltSync()
        usuario.password=bcrypt.hashSync(password,salt);




        //guardarlo en la base de datos
        await usuario.save();
            //respuesta al put
            res.json({
                ok:true,
                usuario
            })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            ok:false,
            msg:"error inesperado... revisar logs"
            
        })
    }


}


const actualizarUsuario = async (req,res)=>{

    const uid=req.params.id;    

    try {
        //verificar si el usuario existe por medio del id
        const usuarioBD=await Usuario.findById(uid);
      
        if(!usuarioBD){

            return res.status(404).json({
                ok:false,
                msg:"no existe un usuario con ese id"
            })
        }
        //si pasa hasta aca quiere decir que existe el usuario en la base de datos
        //TO DO: validar token y comprobar si es el usuario correcto

         //obtenemos los campos del body para actualizar
        const {password,google,email,...campos}=req.body

        
        if(usuarioBD.email !== email){ // este if pregunta si el email ingresado es igual al email que ya esta en la base de datos, en caso de que si lo borramos para no actualizarlo
           
            const existeEmail = await Usuario.findOne({email})
            if(existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg:"ya existe un usuario con ese email"
                })
            }

        }
        campos.email=email //actualizamos el email           
       
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos,{new:true}) //new:true es para que devuelva el usuario actualizado 
   
        res.json({
            ok:true
            ,usuarioActualizado
        })


    }
    catch(err){
        console.log(err);
        res.status(500).json({
            ok:false,
            msg:err.message
            
        })
    }

}



const borrarUsuario=async (req,res)=>{
    const uid=req.params.id;


    try{
        const usuarioBD=await Usuario.findById(uid); //comprobamos si el usuario exite por medio del id

        if(!usuarioBD){
            //en caso de que no exista el usuario mandamos el error
            return res.status(404).json({
                ok:false,
                msg:"no existe un usuario con ese id"
            })
        }

        //en caso de que exista el usuario lo borramos
        await Usuario.findByIdAndDelete(uid);
        
        //mandamos la respuesta
        return res.status(400).json({
            ok:false,
            msg:"Se elimino el usuario correctamente"
        })


    }
    catch(err){
        res.status(500).json({
            ok:false,
            msg:err.message
        })
    }





}





module.exports={getUsuarios,crearUsuario,actualizarUsuario,borrarUsuario}