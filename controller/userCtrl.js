const User = require( "../models/userModel" );

const createUser = async ( req, res ) => {
  const email = req.body.email;
  const findUser = await User.findOne( { email:email  } );
  if ( !findUser ) {
    //Crear un nuevo Usuario
    const newUser = await User.create( req.body );
    res.json( newUser );
  } else {
    res.json( {
      msg: "El usuario ya existe.",
      success: false,
    } );
  }
};

module.exports = { createUser };