import {createSlice} from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const productPresent = state.cart.find(
        (product) => product._id === action.payload._id
      );

      if (productPresent) {
        // Incrementa la cantidad si el producto ya está en el carrito
        productPresent.quantity++;
      } else {
        // Agrega un nuevo producto al carrito si no está presente
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const removeProduct = state.cart.filter(
        (product) => product._id !== action.payload._id
      );
      state.cart = removeProduct;
    },
    incrementQuantity: (state, action) => {
      const productPresent = state.cart.find(
        (product) => product._id === action.payload._id
      );
      productPresent.quantity++;
    },
    decrementQuantity: (state, action) => {
      const productPresent = state.cart.find(
        (product) => product._id === action.payload._id
      );
      if (productPresent.quantity === 1) {
        const removeProduct = state.cart.filter(
          (product) => product._id !== action.payload._id
        );
        state.cart = removeProduct;
      } else {
        productPresent.quantity--;
      }
    },
  },
});

export const {addToCart, removeFromCart, incrementQuantity, decrementQuantity} = cartSlice.actions;

export default cartSlice.reducer;