const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
 
    img: {
        type: String,
    },
    usuario: {
        required: true,
        type:Schema.Types.ObjectId,   //con esto decimos que es un id de otro modelo
        ref:'Usuario'
    }

},
   { collection : 'hospitales'} // con esto decimos que la coleccion se llame hospitales en mongo compass

);

HospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
 
    return object
})



module.exports = model( 'Hospital', HospitalSchema );