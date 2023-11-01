const {default: mongoose} = require( "mongoose" );

const dbConnect = () => {
  try {
    mongoose.connect( process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true} );//
    console.log('Mongoose conectado exitosamente');
  } catch ( error ) {
    console.log( "Error Database" )
  };
};

module.exports = dbConnect;