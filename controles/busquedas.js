


const {response}=require('express');
const Usuario=require('../models/usuario')
const Medicos=require('../models/medicos')
const Hospitales=require('../models/hospital')





const getTodo=async (req,res=resonse)=>{
    const busqueda= req.params.busqueda//obtenemos el parametro de busqueda
    const regex= new RegExp(busqueda,'i') //esto lo hacemos para modificar la sensibilidad con la que queremos buscar



    const [usuario,medico,hospitales] = await Promise.all([
         Usuario.find({nombre:regex}),
         Medicos.find({nombre:regex}),
        Hospitales.find({nombre:regex})
    ])



    res.json({
        ok:true,
        msg:'getTodo',
        busqueda:busqueda,
        usuario:usuario,
        medico:medico,
        hospitales:hospitales  
  
    })
}



const getDocumentoColeccion=async (req,res=resonse)=>{
    console.log('ENTROOOOOO')
    //Obtencion de parametros
    const tabla= req.params.tabla
    const busqueda= req.params.busqueda

    //hacer mas flexible la expresion regular
    const regex= new RegExp(busqueda,'i') //esto lo hacemos para modificar la sensibilidad con la que queremos buscar

    let data=[]

    console.log('-------------')
    console.log(tabla)
    switch(tabla){
        case'medicos':
            data= await Medicos.find({nombre:regex})
                               .populate('usuario','nombre img')
                               .populate('hospital','nombre img')
        break;

        case'hospitales':
            data= await Hospitales.find({nombre:regex})
                                  .populate('usuario','nombre img')
        break;

        case'usuarios':
            data = await Usuario.find({nombre:regex})
        break;

        default: // si no es ninguno de los tres de arriba mandamos error
          return res.status(400).json({
                ok:false,
                msg:'La tabla tiene que ser usuario/medicos/hospitales'
            })

   

    }
    res.json({
        ok:true,
        coleccion:tabla,
        resultados:data
    })
}









module.exports={
    getTodo,
    getDocumentoColeccion
}

