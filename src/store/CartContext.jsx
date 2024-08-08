import { createContext, useReducer } from 'react'

const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { },
})

function cartReducer(state, action) {
    if (action.type === 'Add_Item') {
        const existingItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        const updatedItems = [...state.items];
        if (existingItemIndex > -1) {
            const existingItem = state.items[existingItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1,
            }
            updatedItems[existingItemIndex] = updatedItem;
        } else {
            updatedItems.push({ ...action.item, quantity: 1 });
        }
        return { ...state, items: updatedItems };
    }

    if (action.type === 'Remove_Item') {
        const existingItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingItem = state.items[existingItemIndex];
        const updatedItems = [...state.items];
        if (existingItem.quantity === 1) {
            updatedItems.splice(existingItemIndex, 1); //will remove the item at that index.
        } else {
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity - 1,
            }
            updatedItems[existingItemIndex] = updatedItem;
        }
        return { ...state, items: updatedItems };
    }

    return state;
}

export function CartContextProvider({ children }) {
    const[cart, dispatchCartAction]=useReducer(cartReducer, { items: [] });
    
    function addItem(item){
        dispatchCartAction({type:'Add_Item', item}) // item:item
    }

    function removeItem(id){
        dispatchCartAction({type:'Remove_Item', id})
    }

    const cartContext ={
        items : cart.items,
        addItem, // addItem:addItem(if the key and value are same then we can write once).
        removeItem
    }
console.log('cartContext::',cartContext)
    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext;