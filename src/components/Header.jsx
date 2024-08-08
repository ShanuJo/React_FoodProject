import React, { useContext } from 'react'
import logo from '../assets/logo.jpg'
import Button from '../UI/Button'
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalItemsInCart = cartCtx.items.reduce((totalNumberOfItems, item)=>{
    return totalNumberOfItems + item.quantity;
  },0);

  function handleShowCart(){
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
        <div id="title">
            <img src={logo} alt="logo" />
            <h1>Food Gallary</h1>
        </div>
      <nav><Button textOnly onClick={handleShowCart}>Cart ({totalItemsInCart}) </Button></nav>
    </header>
  )
}
