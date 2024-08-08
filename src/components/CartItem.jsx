import React, { useContext } from 'react'
import { currencyFormatter } from '../util/formatting'
import CartContext from '../store/CartContext'

export default function CartItem({ item }) {
    const cartctx = useContext(CartContext);

    function onDecrease(id){
        cartctx.removeItem(id);
    }

    function onIncrease(item){
        cartctx.addItem(item);
    }
    return (

        <li className='cart-item'>
            {item.name} - {item.quantity} x {currencyFormatter.format(item.price)}
            <p></p>
            <p className='cart-item-actions'>
                <button onClick={()=>onDecrease(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={()=>onIncrease(item)}>+</button>
            </p>
        </li>

    )
}
