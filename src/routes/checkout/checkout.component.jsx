import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addCartItem} from "../../redux/reducer/cartSliceReducer";

const CheckOut = () => {
    const {cartItems,cartTotal} = useSelector(state => state.cartState);
    const dispatch = useDispatch();

    useEffect(() => {

    }, [cartTotal]);

    return (
        <div>
            {cartItems.map(cart => (

                <div key={cart.id} >
                    <h1>{cart.name}</h1>
                    <h2>{cart.price}</h2>
                    <h2>{cart.quantity}</h2>
                    <button onClick={()=>{dispatch(addCartItem({product:cart}))}}>INCREASE</button>
                    <button onClick={()=>{dispatch(addCartItem({product:cart,quantity:-1}))}}>DECREASE</button>
                    <button onClick={()=>{dispatch(addCartItem({product:cart,quantity:0}))}}>Remove Item</button>
                    <h3>------------------------------------------</h3>
                </div>


            ))}
            <div>
                total :{cartTotal}
            </div>
        </div>
    );
};

export default CheckOut;
