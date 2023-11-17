import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
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
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      const removeProduct = state.cart.filter(
        (product) => product._id !== action.payload._id
      );
      state.cart = [...removeProduct];
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    incrementQuantity: (state, action) => {
      const productPresent = state.cart.find(
        (product) => product._id === action.payload._id
      );
      productPresent.quantity++;
      localStorage.setItem("cart", JSON.stringify(state.cart));
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
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  setCart,
} = cartSlice.actions;

export default cartSlice.reducer;
