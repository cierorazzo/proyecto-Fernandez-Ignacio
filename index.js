const express = require ("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 3000;
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");

dbConnect();

app.use( "/", ( req, res ) => {
  res.send( "Hola desde el servidor" );
});

app.use( "/api/user", authRouter );
app.use( "/api/product", productRouter );

app.listen( PORT, () => {
  console.log( `Servidor corriendo en el puerto: ${PORT}` );
});