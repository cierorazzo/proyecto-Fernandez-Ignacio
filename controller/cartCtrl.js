const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const mongoose = require( "mongoose" );
const asyncHandler = require("express-async-handler");

const createCart = asyncHandler(async (req, res) => {
  try {
    const products = req.body.products;

    let total = 0;

    // Recorre los productos y suma quantity * price al total
    for (const product of products) {
      if (typeof product.price === "number" && typeof product.quantity === "number") {
        total += product.quantity * product.price;
      }
    }

    const newCart = await Cart.create({
      items: products,
      total: total,
    });

    res.status(201).json(newCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el carrito" });
  }
});


const addProductToCart = asyncHandler(async (req, res) => {
  try {
    const { cartId } = req.params;
    const { products } = req.body;

    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    cart.total = 0;

    for (const productInfo of products) {
      const { productId, quantity } = productInfo;

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      // Calcula el precio total del producto (precio x cantidad)
      const itemTotal = product.price * quantity;

      // Agrega el producto al carrito
      cart.items.push({ product: product._id, quantity, itemTotal });

      // Actualiza el precio total del carrito
      cart.total += itemTotal;
    }

    await cart.save();

    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});


const updateProductInCart = asyncHandler(async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const cartItem = cart.items.find((item) => item.product.toString() === productId);

    if (!cartItem) {
      return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
    }

    // Actualiza la cantidad del producto
    if (typeof quantity === 'number' && !isNaN(quantity) && quantity >= 0) {
      cartItem.quantity = quantity;

      // Recalcula el precio total del carrito
      let cartTotal = 0;
      for (const item of cart.items) {
        const product = await Product.findById(item.product);
        if (item.quantity && product) {
          cartTotal += item.quantity * product.price;
        }
      }
      cart.total = cartTotal;

      await cart.save();

      res.json(cart);
    } else {
      return res.status(400).json({ error: 'La cantidad debe ser un número válido y mayor o igual a 0' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la cantidad del producto en el carrito' });
  }
});

const deleteProductFromCart = asyncHandler(async (req, res) => {
  try {
    const { cartId, productId } = req.params;

    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Busca el índice del producto en el carrito
    const productIndex = cart.items.findIndex((item) => item.product.toString() === productId);

    if (productIndex === -1) {
      return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
    }
    cart.items.splice(productIndex, 1);

    let cartTotal = 0;
    for (const item of cart.items) {
      const product = await Product.findById(item.product);
      if (item.quantity && product) {
        cartTotal += item.quantity * product.price;
      }
    }
    cart.total = cartTotal;

    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
  }
});

const deleteCart = asyncHandler(async (req, res) => {
  try {
    const cartId = req.params.id;
    console.log('Cart ID:', cartId);

    const result = await Cart.deleteOne({ _id: cartId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "El carrito no se encontró" });
    }

    res.json({ message: "Carrito eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el carrito' });
  }
});

module.exports = { createCart, addProductToCart, updateProductInCart, deleteProductFromCart, deleteCart };