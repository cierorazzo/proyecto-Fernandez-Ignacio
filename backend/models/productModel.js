const mongoose = require( 'mongoose' ); // Inicialicé mediante cmd !sb

// Declarar Schema del modelo de MongoDB
var productSchema = new mongoose.Schema( 
  {
    title:{
        type: String,
        required: true,
        trim: true,
    },
    slug:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    brand: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    sold: {
        type: Number,
        default: 0,
    },
    carts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Cart',
        },
      ],
    images: [
        {
          type: String,
        },
      ],
    },
  {timestamps: true}
);

//Export the model
module.exports = mongoose.model("Product", productSchema);