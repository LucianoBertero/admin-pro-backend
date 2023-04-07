
const {response}=require('express');
const Usuario=require('../models/usuario');
const bcrypt= require('bcryptjs'); //libreria para encriptar la contraseña del usuario, importada con npm i bcryptjs
const {generarJWT}=require('../helpers/jwt')
const {googleVerify} =require('../helpers/google-verify')



const login = async(req,res=response) => {
    const { email, password } = req.body;
    console.log('-------------------- ')
    console.log(email)
    console.log('-------------------- ')



    try
    {
      
        const usuarioDB= await Usuario.findOne({email}); //pregunta si el email existe en la base de datos       

        //Verificar Email
        if(!usuarioDB){ //si no existe el email ya esta weon

           
            return res.status(404).json({
                ok:false,
                msg:"email no encontrado"
            })
        }

        //confirmar los passwords
        //compara el password ingresado, con el hash que se tiene en la base de datos
        const validPassword = bcrypt.compareSync( password, usuarioDB.password ); //compara el password que se envia con el password que esta en la base de datos, devulve tru si hace match
        
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:"password no valido"
            })
        }

        //generar token
        const token = await generarJWT(usuarioDB.id); //genera el token, y lo guarda en la variable token

        res.json({
            ok:true,
            token
        })
    }

    catch(err)
    {
        console.log(err);
        res.status(500).json({
            ok:false,
            msg:"Hable con el administrdador"
            
        })
    }
}


const googleSingIn = async(req,res=response)=>{

    try{
        const {email,name,picture}=await googleVerify(req.body.token)   
        const usuarioDB = await Usuario.findOne({ email: email });
   
        let usuario;
        
        if(!usuarioDB){
            usuario=new Usuario({
                nombre:name,
                email:email,
                password:'@@@',
                img:picture,
                google:true
            })

        }else{

            usuario=usuarioDB
            usuario.google=true
        }


        //guardar Usuario
        await usuario.save()
        .then(savedData => {
          console.log(savedData); // Muestra los datos guardados
        })
        .catch(error => {
          console.log(error); // Muestra cualquier error que se haya producido durante el guardado
        });

        //generar token
        const token =await generarJWT(usuario.id) //generar el token para saber si la persona esta logueada y podes usar de la app

        res.status(500).json({
            ok:true,
            email,name,picture,
            token            
        })
    }
    catch(erorr){
        console.log(erorr)
        res.status(400).json({
            ok:false,
            msg:'Token de google no es correcto',

            
        })
    }
}

const renewToken=async (req,res=response)=>{

    const uid=req.uid
    const token = await generarJWT(uid)


    res.json({
        ok:true,
        uid,

        token
    })
}






module.exports={
    login,
    googleSingIn,
    renewToken
}