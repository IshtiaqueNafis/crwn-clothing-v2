import React, {useEffect} from 'react';
import "./checkout.styles.scss"
import {useSelector} from "react-redux";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import {selectAllCartProducts} from "../../redux/reducer/cartSliceReducer";
import PaymentForm from "../../components/payment-form/payment-form.component";

const CheckOut = () => {
    const {cartTotal} = useSelector(state => state.carts);
    const cartItems = useSelector(selectAllCartProducts);

    useEffect(() => {

    }, [cartTotal])

    return (
        <div className={'checkout-container'}>
            <div className={'checkout-header'}>
                <div className={"header-block"}>
                    <span>Product</span>
                </div>
                <div className={"header-block"}>
                    <span>Description</span>
                </div>
                <div className={"header-block"}>
                    <span>Quantity</span>
                </div>
                <div className={"header-block"}>
                    <span>Price</span>
                </div>
                <div className={"header-block"}>
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.map((cartItem) =>
                (
                    <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
                ))}
            <span className={'total'}> Total:${cartTotal}</span>
            <PaymentForm/>
        </div>
    );
};

export default CheckOut;
