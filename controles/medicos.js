
const {response} = require('express');
const Medico= require('../models/medicos');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');

const getMedicos = async (req, res=response) => {


    try
    {
        const medicos= await Medico.find()
                                    .populate('usuario','nombre email img')
                                    .populate('hospital','nombre img')
        res.json({
            ok: true,
            medicos:medicos
        })
    }catch(error){
        res.status(500).json({
            ok:false,
            msg:error.message
        })
    }
}

const crearMedicoss = async (req, res=response) => {

    const medicosDB= new Medico({
        usuario:req.uid,
        hospital:req.hospital,
        ...req.body});
    try{

        const medicosDb= await medicosDB.save();


        res.json({
            ok: true,
            msg: 'crearMedicos',
            medicos:medicosDb  
        })


    }catch(error){
        res.status(500).json({
            ok:false,
            msg:error.message
        })
    }







}

const actualizarMedicos = async(req, res=response) => {

    const id=req.params.id //obtenemos el id del usuario a actualizar 
    const uid= req.uid   //es el token del usuario que se mando en ese momento, para guardar quien hizo el cambio
    const uidHospital= req.body.hospital


    try{
        //primero vamos a verificar que el usuario exista
        const medicoDb= await Medico.findById(id) //preguntamos si ese id corresponde a un hospital valido

        if(!medicoDb){

          return  res.status(404).json({ //si no corresponde devolvemos la respuesta
                ok:false,
                msg:'no se encuentra el id del medico',
                id
            })
        }
        const hospitalDB= await Hospital.findById(uidHospital)
        if(!hospitalDB){
            return  res.status(404).json({ //si no corresponde devolvemos la respuesta
                ok:false,
                msg:'no se encuentra el id del Hospital',
                id
            })
        }


        const cambiosMedico={ //en caso de corresponder, actualizamos los parametros mandados en la request
            ...req.body,
            usuario:uid
        }

        const medicoActualizado =await Medico.findByIdAndUpdate(id,cambiosMedico,{new:true}) //actualizamos la nueva info mas el id del usuario quien la hizo

        res.json({
            ok: true,
            msg: 'actualizo el medico',
            medicoActualizado
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

   








    res.json({
        ok: true,
        msg: 'actualizarMedicos'  
    })

}

const borrarMedicos = async(req, res=response) => {

    const id=req.params.id
    try{
        const medicoDB= await Medico.findById(id)
        if(!medicoDB){
           return res.status(404).json({
                ok:false,
                msg:'Id de medico no encontrado'
            })
        }

        await Medico.findByIdAndDelete(id)
        res.json({
            ok:true,
            msg:'Medico Borrado'
        })
    }
    catch(err){
        res.status(404).json({
            ok:false,
            msg:'Hable con el administrador'
        })

    }


}


module.exports = {
    getMedicos,
    crearMedicoss,
    actualizarMedicos,
    borrarMedicos
}