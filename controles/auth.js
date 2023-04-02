
const {response}=require('express');
const Usuario=require('../models/usuario');
const bcrypt= require('bcryptjs'); //libreria para encriptar la contraseña del usuario, importada con npm i bcryptjs
const {generarJWT}=require('../helpers/jwt')



const login = async(req,res=response) => {
    const { email, password } = req.body;
    console.log('-------------------- ')
    console.log(email)
    console.log('-------------------- ')



    try
    {
      
        const usuarioDB= await Usuario.findOne({email}); //pregunta si el email existe en la base de datos
        
        console.log({usuarioDB})
        console.log('--------------------  ')
        //Verificar Email
        if(!usuarioDB){ //si no existe el email ya esta weon

            console.log('-------------------- entro ')
            return res.status(404).json({
                ok:false,
                msg:"email no encontrado"
            })

        }
        console.log('-------------------- no entro ')
        console.log('--------------------2  ')
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




module.exports={
    login
}