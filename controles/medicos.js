
const {response} = require('express');
const Medico= require('../models/medicos');

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

const actualizarMedicos = (req, res=response) => {

    res.json({
        ok: true,
        msg: 'actualizarMedicos'  
    })

}

const borrarMedicos = (req, res=response) => {

    res.json({
        ok: true,
        msg: 'Borrar medicos'  
    })

}


module.exports = {
    getMedicos,
    crearMedicoss,
    actualizarMedicos,
    borrarMedicos
}