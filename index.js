const express = require ("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 3000;
//const authRouter = require("./routes/authRoute");
dbConnect();

//app.post("/api/user", authRouter );
app.listen( PORT, () => {
  console.log( `Servidor corriendo en el puerto: ${PORT}` );
});