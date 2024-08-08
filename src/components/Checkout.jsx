import { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "../UI/Input";
import Button from "../UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";

const requstConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

export default function Checkout() {
    const cartctx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const { data, error, isLoading, sendRequest, clearData } = useHttp('http://localhost:3000/orders', requstConfig);

    const cartTotal = cartctx.items.reduce((totalPrice, item) =>
        totalPrice + item.quantity * item.price
        , 0)

    function handleClose() {
        userProgressCtx.hideCheckout();
    }

    function handleFinish() {
        userProgressCtx.hideCheckout();
        cartctx.clearCart();
        clearData();
    }

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries()); // key value pair like Email: test@demo.com

        sendRequest(JSON.stringify({
            order: {
                items: cartctx.items,
                customer: customerData,
            }
        }))
    }

    let actions = (
        <>
            <Button textOnly type="button" onClick={handleClose}>Close</Button>
            <Button>Submit Order</Button>
        </>
    );

    if (isLoading) {
        actions = <span>Sending the order request...</span>
    }

    if(data && !error){
        return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
            <h2>Congratulations!</h2>
            <p>Your order was submitted successfully.</p>
            <p>You will be notified with more details via email.</p>
            <p className="modal-actions">
                <Button onClick={handleFinish}>Okay</Button>
            </p>
        </Modal>
    }

    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total amount: {currencyFormatter.format(cartTotal)}</p>
                <Input label='Name' type="text" id="name" />
                <Input label='Email' type="email" id="email" />
                <Input label='Phone Number' type="number" id="number" />
                <Input label='Street' type="text" id="street" />

                <div className="control-row">
                    <Input label='Postal code' type="text" id="postal-code" />
                    <Input label='City' type="text" id="city" />
                </div>
                {error && <div className="error">
                    <h2>Failed to submit order!</h2>
                    <p>{error}</p>
                </div>}
                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    )
}
