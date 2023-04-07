
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


const actualizarHospitales = async(req, res=response) => {

    const  id=req.params.id //obtenemos el id del hospital a actualizar
    const uid= req.uid   //es el token del usuario que se mando en ese momento, para guardar quien hizo el cambio


    try{
        const hospitalDB= await Hospital.findById(id) //preguntamos si ese id corresponde a un hospital valido

        if(!hospitalDB){

          return  res.status(404).json({ //si no corresponde devolvemos la respuesta
                ok:false,
                msg:'no se encontro hospital con ese id',
                id
            })
        }


        const cambiosHospital={ //en caso de corresponder, actualizamos los parametros mandados en la request
            ...req.body,
            usuario:uid
        }

        const hospitalActualizado =await Hospital.findByIdAndUpdate(id,cambiosHospital,{new:true}) //actualizamos la nueva info mas el id del usuario quien la hizo

        res.json({
            ok: true,
            msg: 'actualizarHospitales',
            hospitalActualizado
        })

   
    }
    catch(error){



        res.status(500).json({
            ok:false,
            msg:"un problema ocurrio",
            error:error.message
        })

    }

}





const borrarHospitales = async (req, res=response) => {
    const  id=req.params.id


    try{
        const hospitalDB= await Hospital.findById(id) //preguntamos si ese id corresponde a un hospital valido

        if(!hospitalDB){

          return  res.status(404).json({ //si no corresponde devolvemos la respuesta
                ok:false,
                msg:'no se encontro hospital con ese id',
                id
            })
        }

        await Hospital.findByIdAndDelete(id)
        res.json({
            ok: true,
            msg: 'Hospital borrado con exito'  
        })

    }
    catch(error){
        res.status(400).json({
            ok: false,
            msg: 'hable con el admin'  
        })

    }

   

}








module.exports = {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales,
  
}