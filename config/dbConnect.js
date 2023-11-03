const { default: mongoose } = require( "mongoose" );
//Accion para conectar a la base de datos
const dbConnect = () => {
  try {
    const conn = mongoose.connect( process.env.MONGODB_URL);//info enviada a .env
    console.log( 'Mongoose conectado exitosamente' );
  } catch ( error ) {
    console.log( "Error Database" )
  };
};

module.exports = dbConnect;