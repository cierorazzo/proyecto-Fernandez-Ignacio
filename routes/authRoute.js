const express = require( "express" );
const { createUser, loginUserCtrl, getallUser, getaUser, deleteaUser, updatedUser } = require( "../controller/userCtrl" );
const router = express.Router(); //Definir y gestionar rutas en la app


router.post( "/register", createUser );
router.post( "/login", loginUserCtrl );
router.get( "/all-users", getallUser );
router.get( "/:id", getaUser );
router.delete( "/:id", deleteaUser );
router.put( "/:id", updatedUser );
module.exports = router;