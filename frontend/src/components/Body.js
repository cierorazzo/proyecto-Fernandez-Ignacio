import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "./Body.css";
import ProductItem from './ProductItem';

function Body() {
  const [products, setProducts] = useState([]);
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/product');
        if (!response.ok) {
          throw new Error('Error al cargar productos');
        }

        const data = await response.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='body'>
      <div className='bodyItems'>
        {products.map((product, index) => (
          <ProductItem key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Body;
          