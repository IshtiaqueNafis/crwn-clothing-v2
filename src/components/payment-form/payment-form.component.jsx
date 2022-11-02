import React, {useState} from 'react';
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import {FormContainer, PaymentFormContainer} from "./payment-form.styles";
import {useDispatch, useSelector} from "react-redux";
import {resetState} from "../../redux/reducer/cartSliceReducer";

const PaymentForm = () => {
    const {currentUser} = useSelector(state => state.userState);
    const {cartTotal} = useSelector(state => state.carts)
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const dispatch = useDispatch();
    console.log({cartTotal})
    const stripe = useStripe();
    const element = useElements();
    const paymentHandler = async (e) => {
        e.preventDefault();
        if (!stripe || !element) return;
        setIsProcessingPayment(true);
        const response = await fetch("/.netlify/functions/create-payment-intent", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({amount: cartTotal * 100})
        }).then(res => res.json())
        const {paymentIntent: {client_secret}} = response;

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: element.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : "guest",


                }
            }
        })
        setIsProcessingPayment(false);
        if (paymentResult.error) {
            console.log(paymentResult.error);

        } else {
            if (paymentResult.paymentIntent.status === 'succeeded') {
                alert('Payment Successful')
                element.getElement(CardElement).clear();
                dispatch(resetState());
            }
        }
    }

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <CardElement/>
                <Button disabled={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</Button>
            </FormContainer>
        </PaymentFormContainer>
    );
};

export default PaymentForm;
