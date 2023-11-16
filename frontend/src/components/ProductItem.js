import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/CartSlice';
import "./ProductItem.css"

function ProductItem({ product }) {
    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();
    const addProductToCart = (product) => {
      dispatch(addToCart(product));
    }
    const removeProductFromCart = (product) => {
      dispatch(removeFromCart(product));
    }
  return (
    <div className='productItem'>

      {/*IMAGEN DEL PRODUCTO */}
      <img style={{ width: 200, height: 200, marginLeft:"auto", marginRight:"auto" }} src={`http://localhost:3000${product.images}`} alt={product.title} />

      {/*TITULO DEL PRODUCTO */}
      <p>{product.title}</p>

      {/*PRECIO DEL PRODUCTO */}
      <p>{product.price}</p>

      {/*BOTON DE AÑADIR AL CARRITO */}
      {cart.some((x) => x._id === product._id) ? (
        <button onClick={() => removeProductFromCart(product)} className='productItemBtn'>Eliminar del carrito</button>
      ) : (
        <button onClick={() => addProductToCart(product)} className='productItemBtn'>Añadir al carrito</button>
      )}

    </div>
  );
}

export default ProductItem;
