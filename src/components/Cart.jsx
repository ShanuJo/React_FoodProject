import React, { useContext } from 'react'
import Modal from '../UI/Modal'
import CartContext from '../store/CartContext';
import { currencyFormatter } from '../util/formatting';
import Button from '../UI/Button';
import UserProgressContext from '../store/UserProgressContext';
import CartItem from './CartItem';

export default function Cart() {
    const cartctx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext)

    const cartTotal = cartctx.items.reduce((totalPrice, item) =>
        totalPrice + item.quantity * item.price
        , 0)

    function handleHideCart() {
        userProgressCtx.hideCart();
    }
    function handleShowCheckout() {
        userProgressCtx.showCheckout();
    }

    return (
        <Modal
            className='cart'
            open={userProgressCtx.progress === 'cart'}
            onClose={userProgressCtx.progress === 'cart' ? handleHideCart : null}
        >
            <h2>Your Cart</h2>
            <ul>
                {cartctx.items.map(item => {
                    return <CartItem key={item.id} item={item} />
                })}
            </ul>
            <p className='cart-total'>Total Price = {currencyFormatter.format(cartTotal)}</p>
            <p className='modal-actions'>
                <Button textOnly onClick={handleHideCart}>Close</Button>
                {cartctx.items.length > 0 && <Button onClick={handleShowCheckout}>Go to Checkout</Button>}
            </p>
        </Modal>
    )
}
