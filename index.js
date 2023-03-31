
require('dotenv').config()
const express=require('express')
const {dbconection}=require('./database/config')
const cors=require('cors')






const app=express()

//configurar cors
app.use(cors())


dbconection()
console.log(process.env)


//rutas
app.get('/',(req,res)=>{
    res.json({
        ok:true,
        msg:'get api'
        
    })

})





app.listen(process.env.PORT,()=>{
    console.log('server is running on port '+process.env.PORT)
})