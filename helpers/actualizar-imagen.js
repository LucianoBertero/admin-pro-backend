
const fs=require('fs')  //con esto se puede leer el fileSistem

const Usuario= require('../models/usuario')
const Medico= require('../models/medicos')
const Hospital= require('../models/hospital')




const borrarImagen=(path)=>{
    
    if( fs.existsSync(path)){//se verifica si tiene una imagen previamente subida  
     
        fs.unlinkSync(path)    // En el caso que si la borramos 
    }
}



const acualizarImagen = async(tipo,id,nombreArchivo)=>{
    let PathViejo=' '

    switch(tipo){

        case 'medicos':
            const medico= await Medico.findById(id)
            if(!medico){
            
                return false
            }
            PathViejo=`./uploads/medicos/${medico.img}`

           borrarImagen(PathViejo)

            medico.img=nombreArchivo //asignamos el path a la instancia de medico por id
            await medico.save()      // guardamos las nuevas configs 
            return true

        break;

        case 'hospitales':

             const hospital= await Hospital.findById(id)
             console.log({hospital})
            if(!hospital){
            
                return false
            }

            PathViejo=`./uploads/hospitales/${hospital.img}`
            console.log(PathViejo)


          borrarImagen(PathViejo)

            hospital.img=nombreArchivo //asignamos el path a la instancia de medico por id
            await hospital.save()      // guardamos las nuevas configs 
       
            return true

        break;

        case 'usuarios':
            const usuario= await Usuario.findById(id)
            if(!usuario){
          
                return false
            }
            PathViejo=`./uploads/usuarios/${usuario.img}`  

            borrarImagen(PathViejo)
            usuario.img=nombreArchivo //asignamos el path a la instancia de medico por id
            await usuario.save()      // guardamos las nuevas configs 
            return true            

        break;

    }

 
}


module.exports={
    acualizarImagen
}