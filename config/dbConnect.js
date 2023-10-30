const mongoose = require( "mongoose" );

const dbConnect = () => {
  try {
    const conn = mongoose.connect( process.env.MONGODB_URL );
    console.log('Conectado exitoSamente');
  } catch ( error ) {
    console.log( "Error Database" )
  };
};

module.exports = dbConnect;