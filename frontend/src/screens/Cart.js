import React, { useEffect } from "react";
import Header from "../components/Header";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  setCart,
} from "../redux/CartSlice";
import { useNavigate } from "react-router-dom";

function Cart() {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((product) => product.price * product.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    dispatch(setCart(storedCart));
  }, [dispatch]);
  const incrementProductQuantity = (product) => {
    dispatch(incrementQuantity(product));
  };
  const decrementProductQuantity = (product) => {
    dispatch(decrementQuantity(product));
  };

  const generatePurchase = async () => {
    try {
      if (cart.length === 0) {
        console.error("No hay productos en el carrito.");
        return;
      }

      const purchaseData = {
        products: cart.map((product) => ({
          product: product._id,
          quantity: product.quantity,
          itemTotal: product.price * product.quantity,
        })),
      };

      const response = await fetch("http://localhost:3000/api/cart/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(purchaseData),
      });

      if (response.ok) {
        dispatch(setCart([]));
        localStorage.removeItem("cart");
        alert("Compra generada con éxito");
      } else {
        console.error("Error al generar la compra. Detalles:", response);
      }
    } catch (error) {
      console.error("Error al generar la compra:", error);
    }
  };
  return (
    <>
      <Header />
      <div className="cart">
        {/*SECCION PRODUCTOS */}
        <div className="cartProd">
          {cart.map((product, index) => (
            <div className="cartContainer">
              {/*IMAGEN */}
              <div>
                <img
                  src={`http://localhost:3000${product.images}`}
                  alt={product.title}
                  style={{ width: 100, height: 100 }}
                />
              </div>

              {/*NOMBRE y PRECIO */}
              <div className="cartDescription">
                <p>
                  {product.title.length > 60
                    ? product.title.substr(0, 60)
                    : product.title}
                </p>
                <p style={{ marginTop: 10 }}>$ {product.price}</p>
              </div>

              {/*BOTONES + - */}
              <div className="cartButtonsContainer">
                <div className="cartButtons">
                  <div>
                    <button
                      onClick={() => incrementProductQuantity(product)}
                      style={{ cursor: "pointer" }}
                      className="cartButton"
                    >
                      Agregar
                    </button>
                  </div>

                  <div>{product.quantity}</div>

                  <div>
                    <button
                      onClick={() => decrementProductQuantity(product)}
                      style={{ cursor: "pointer" }}
                      className="cartButton"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
                <h4 style={{ marginTop: 5 }}>
                  $ {product.price * product.quantity}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/*SECCION seguir comprando, total */}
        <div className="cartTwo">
          <div className="cartBtnShop">
            <button onClick={() => navigate("/")} className="cartButtonShop">
              Seguir comprando
            </button>
          </div>

          <div className="cartTotal">
            <div>
              <h3>Total:</h3>
              <h4>{total}</h4>
            </div>
          </div>

          <button
            onClick={generatePurchase}
            style={{ cursor: "pointer" }}
            className="cartButtonOrder"
          >
            Generar Compra.
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;
