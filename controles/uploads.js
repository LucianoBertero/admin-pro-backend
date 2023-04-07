const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const {acualizarImagen}=require('../helpers/actualizar-imagen')
const path=require('path') //para obtener un path completo, lo usamos en la obtencion de imagenes
const fs=require('fs')



//para subir las fotos usamos la libreria npm express-fileupload



const fileUpload= (req,res=response)=>{
    //extraccion de parametros
    const tipo = req.params.tipo
    const id= req.params.id

    const tiposValidos= ['hospitales','medicos','usuarios']

    if(!tiposValidos.includes(tipo)){ //si el argumento mandado como tipo no responde a ninguno de estos tres strngs
        return res.status(400).json({
            ok:false,
            msg:'Tipo mal colocado, no es medico, usuario u hospital'
        })
    }

    //validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg:'no hay ningun archivo'
        })
      }

    //procesar imagen
    const file= req.files.imagen    
    const nombreCortado=file.name.split('.')
    const extencionArchivo=nombreCortado[nombreCortado.length-1]

    //validar Extencion
    const extencionesValidas=['png','jpg','jpeg','gif']

    if(!extencionesValidas.includes(extencionArchivo)){
        return res.status(400).json({
            ok:false,
            msg:'No es una extencion permitida'
        })
    }

    //generar el nombre del archivo, PARA ESTA PARTE INTALAMOS npm install UUID
    const nombreArchivo= `${uuidv4()}.${extencionArchivo}`

    //path para guardar la imagen
    const path=`./uploads/${tipo}/${nombreArchivo}`

    //mover la imagen
    file.mv(path, (err) => {

        if (err){
            console.log(err)
            return res.status(500).json({
                ok:false,
                msg:"error al mover la imagen, hable con el admin"
            })
        }  
        //aca hay que actualizar la base de datos 
        acualizarImagen(tipo,id,nombreArchivo)   
        
        res.json({
            oks:true,
            msg:"archivo subido",
            nombreArchivo
        })

      });

}


const retornaImgen=(req,res=response)=>{ //para este metodo tenemos que utilizar el path de path
    const tipo = req.params.tipo
    const foto= req.params.foto

    const pathImg=path.join(__dirname,`../uploads/${tipo}/${foto}`) //para hacer una concatenacion del path con la direccion de la imagen, 
    //esto se puede hacer porque mandamos el formato completo del path de la imagen en la url

    console.log(pathImg)

    if(fs.existsSync(pathImg)){//si exsite el path, esto lo comprobamos con el file sistem, devolvemos la imagen correcta
        res.sendFile(pathImg)
    }else{// en el caso de que no exista se manda una imagen por defecto
        const pathImg=path.join(__dirname,`../uploads/No_Image_Available.jpg`)
        res.sendFile(pathImg)
    }   

}






module.exports={
    fileUpload,
    retornaImgen
}