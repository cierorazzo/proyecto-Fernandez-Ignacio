import React from 'react';
import "./Header.css";
import Logo from "../images/eduu logo.jpg"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useSelector } from 'react-redux';

function Header() {
  const cart = useSelector((state) => state.cart.cart);
  return (
    <div className='header'>

      {/*LOGO INICIO */}
      <div>
      <img
          style={{width:120, height:40, marginTop:10}}
          className='image'
          src={Logo}
        />
      </div>

      {/*CONTENEDOR DE LA BUSQUEDA */}
      <div className='headerInputContainer'>
        <input className='headerInput' type="text" placeholder='  busque algún producto' />
        <SearchOutlinedIcon style={{color:"white", marginLeft:4, marginTop:2}}/>
      </div>

      {/*SECCION DEVOLUCION Y PEDIDOS */}
      <div>
        <h3 className='headerText'>Usuario</h3>
        <h4 className='headerText'>Ignacio</h4>
      </div>

      {/*LOGO CARRITO DE COMPRAS */}
      <div style={{position:"relative"}}>
        <ShoppingCartOutlinedIcon style={{color:"white"}}/>
        <span style={{
          position:"absolute",
          left:14,
          right:14,
          backgroundColor:"white",
          width:14,
          height:14,
          borderRadius:7,
          fontSize:12,
          fontWeight:400,
          textAlign:"center"
        }}>
          {cart.length}
        </span>
      </div>

      {/*Boton para que actue cuando se haga responsive */}
      <div className='headerBottom'>
        <MenuOutlinedIcon style={{color:"white", }}/>
      </div>
    </div>
  )
}

export default Header
