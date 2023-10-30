const Product =  require( "../models/productModel" );
const asyncHandler = require( "express-async-handler" );
const createProduct = asyncHandler( async( req, res ) => {
    res.json( {
        message: "Producto para crear en la ruta"
    });
    
});

module.exports={ createProduct };