const express = require("express");
const {
  createCart,
  addProductToCart,
  updateProductInCart,
  deleteProductFromCart,
  deleteCart,
} = require("../controller/cartCtrl");
const router = express.Router();

//carrito de compras
// Crear un nuevo carrito
router.post("/", createCart);

// Agregar un producto al carrito
router.post("/:cartId/add", addProductToCart);

// Ruta para actualizar la cantidad de un producto en el carrito
router.put("/:cartId/products/:productId", updateProductInCart);

// Borrar un producto del carrito
router.delete("/:cartId/delete/:productId", deleteProductFromCart);

// Ruta para eliminar un carrito
router.delete("/:id", deleteCart);

module.exports = router;
