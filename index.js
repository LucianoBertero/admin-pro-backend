
require('dotenv').config()
const express=require('express')
const {dbconection}=require('./database/config')
const cors=require('cors')






const app=express()

//configurar cors
app.use(cors())

//Carpeta publica
app.use(express.static('public'))

//Lectura y parseo del body
app.use(express.json())

//base de datos
dbconection()



//primer argumento es la ruta, y el segundo es el archivo que se va a ejecutar
app.use('/api/usuarios',require('./routes/usuarios'))//rutas para hacer el manejo de los usuarios 
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/hospitales', require('./routes/hospitales') );
app.use( '/api/medicos', require('./routes/medicos') );
app.use( '/api/todo', require('./routes/busquedas') );
app.use( '/api/uploads', require('./routes/uploads') );










app.listen(process.env.PORT,()=>{
    console.log('server is running on port '+process.env.PORT)
})