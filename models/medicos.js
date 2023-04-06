const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
 
    img: {
        type: String,
    },
    usuario: {
        type:Schema.Types.ObjectId,   //con esto decimos que es un id de otro modelo
        ref:'Usuario',
        required:true
    },
    hospital: {
        type:Schema.Types.ObjectId,   //con esto decimos que es un id de otro modelo
        ref:'Hospital',
        required:true
    }

},
   { collection : 'medicos'} // con esto decimos que la coleccion se llame hospitales en mongo compass
   
);

MedicoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
 
    return object
})



module.exports = model( 'Medicos', MedicoSchema );