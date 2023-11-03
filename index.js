const bodyParser = require( "body-parser" );
const express = require( "express" );
const dbConnect = require( "./config/dbConnect" );
const app = express();
const dotenv = require( "dotenv" ).config();
const PORT = process.env.PORT || 3000;
const authRouter = require( "./routes/authRoute" );
const productRouter = require( "./routes/prodRoute" );
dbConnect();
//    llamado para ver si responde el servidor en el localHost
// app.use( "/", ( req, res ) => {
//   res.send( "Hola desde el servidor" );
// });
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended:false } ))
app.use( "/api/user", authRouter );
app.listen( PORT, () => {
 console.log( `Servidor corriendo en el puerto: ${PORT}` );
});