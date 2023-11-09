const User = require( "../models/userModel" );
const asyncHandler = require( "express-async-handler" );
const { generateToken } = require( "../config/jwtToken" );

//Esquema usuario
const createUser = asyncHandler( async ( req, res ) => {
  const email = req.body.email;
  const findUser = await User.findOne( { email:email  } );
  if ( !findUser ) {
    //Crear un nuevo Usuario
    const newUser = await User.create( req.body );
    res.json( newUser );
  } else {
    throw new Error( "El usuario ya existe" ); 
  }
} );

//Controlador de inicio de sesion
const loginUserCtrl = asyncHandler( async(req, res) => {
  const { email, password } = req.body;//Con el req.body tengo la consulta en la consola
  //El usuario existe o no?
  const findUser = await User.findOne( { email } );
  if( findUser && (await findUser.isPasswordMatched( password )) ) {
    res.json( {
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken( findUser?._id ),
    } );
  } else {
    throw new Error( "Credenciales inválidas" );
  }
});

//Actualizar un usuario
const updatedUser = asyncHandler( async( req, res ) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate( id, 
      {
      firstname: req?.body?.firstname,
      lastname: req?.body?.lastname,
      email: req?.body?.email,
      mobile: req?.body?.mobile,
    },
    {
      new: true,
    } );
    res.json( updatedUser );
  } catch (error) {
    throw new Error(error);
  }
} );
//Buscar todos los usuarios
const getallUser = asyncHandler( async( req, res ) => {
  try {
    const getUsers = await User.find();
    res.json( getUsers );
  } catch (error) {
    throw new Error( error );
  }
} );

//Buscar un usuario
const getaUser = asyncHandler( async( req, res ) => {
  const {id} = req.params;
  try {
    const getaUser = await User.findById( id );
    res.json( {
      getaUser,
    } )
  } catch (error) {
    throw new Error( error );
  }
} );

//Borrar un usuario
const deleteaUser = asyncHandler( async( req, res ) => {
  console.log( req.params );
  const { id } = req.params;
  try {
    const deleteaUser = await User.findById( id );
    res.json( {
      deleteaUser,
    } )
  } catch (error) {
    throw new Error( error );
  }
} );

module.exports = { createUser, loginUserCtrl, getallUser, getaUser, deleteaUser, updatedUser };