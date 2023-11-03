const express = require( "express" );
const { createUser } = require( "../controller/userCtrl" );
const router = express.Router(); //Definir y gestionar rutas en la app

//Al hacer un post a la ruta /register, la fc se ejecuta para resp. a la solicitudes
router.post( "/register", createUser );
module.exports = router;