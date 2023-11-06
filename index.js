const bodyParser = require( "body-parser" );
const express = require( "express" );
const dbConnect = require( "./config/dbConnect" );
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app = express();
const dotenv = require( "dotenv" ).config();
const PORT = process.env.PORT || 3000;
const productRouter = require( "./routes/prodRoute" );
const categoryRouter = require( "./routes/categoryRoute" );
const cartRouter = require( "./routes/cartRoute" )
const { createProduct } = require("./controller/productCtrl");
const morgan = require( "morgan" );

dbConnect();

app.use( morgan( "dev" ) );//Cuanto demora en llegar la solicitud
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended:false } ))

//llamado para interactuar con LOGIN y CARRITO DE COMPRA(gral)
app.use( "/api/product", productRouter );
app.use( "/api/category", categoryRouter );
app.use( "/api/cart", cartRouter );

app.use(notFound);
app.use(errorHandler);

app.listen( PORT, () => {
 console.log( `Servidor corriendo en el puerto: ${PORT}` );
});