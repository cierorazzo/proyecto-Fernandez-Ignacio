const { default: mongoose } = require( "mongoose" );

const dbConnect = () => {
  try {
    const conn = mongoose.connect( process.env.MONGODB_URL);//info enviada a .env
    console.log( 'Mongoose conectado exitosamente' );
  } catch ( error ) {
    console.log( "Error Database" )
  };
};

module.exports = dbConnect;