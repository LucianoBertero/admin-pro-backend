
const {response} = require('express');
const Hospital = require('../models/hospital');





const getHospitales = async(req, res=response) => {

    try{
        const hospitales= await Hospital.find()
                                        .populate('usuario','nombre email img') //con esto traemos el nombre del usuario que creo el hospital
        res.json({
            ok: true,    
            hospitales:hospitales
        })
    }
    catch(error){
        res.status(500).json({
            ok:false,
            msg:error.message
        })
    }

}


const crearHospitales = async (req,res=response) => {
   
    // para crear un nuevo hospital necesitamos el uid del usuario que lo quiere crear
    //por eso hacermos la desestructuracion del req.body, y ademas le mandamos el uid
    const hospital= new Hospital({
        usuario:req.uid, 
        ...req.body});

    const uid=req.uid; //obtencion del uid del usuario que creo el hospital


    try{

       const hospitalDb =await hospital.save(); //guardamos el hospital en la base de datos

       //mandamos el mensaje
        res.json({ 
            ok: true,
            msg: 'crearHospitales',
            hospital:hospital,  
        })
    }
    catch{
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }

}


const actualizarHospitales = (req, res=response) => {

    res.json({
        ok: true,
        msg: 'actualizarHospitales'  
    })

}





const borrarHospitales = (req, res=response) => {

    res.json({
        ok: true,
        msg: 'actualizarHospitales'  
    })

}








module.exports = {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales,
  
}