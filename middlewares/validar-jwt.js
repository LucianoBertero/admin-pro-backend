



const jwt =require('jsonwebtoken');
const  validarJWt= (req, res, next) => {

    //leer el token en el header
    const token=req.header('x-token');
    console.log(token)
    //verificar el token
    if(!token){ //esto verifica si el token fue mandado en el header solamente

        return res.status(401).json({
            ok:false,
            msg:"no hay token en la peticion"
        })
    }
    try{
        const {uid}=jwt.verify(token,process.env.JWT_SECRET); //verifica el token, y si es valido, devuelve el uid, si esto funcion con la semilla tiene que seguir sino se va al catch
        req.uid=uid       
        next()
    }
    catch(err){
        res.status(401).json({
            ok:false,
            msg:"token no valido"
        })
    }



}




module.exports={
    validarJWt
}