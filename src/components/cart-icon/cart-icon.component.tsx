import React, {useEffect} from 'react';
import {ReactComponent as ShoppingIcon} from "../../assests/shopping-bag (1).svg";
import "./cart-icon.styles.scss"
import {setCartOpen} from "../../redux/reducer/cartSliceReducer";
import {useAppDispatch, useAppSelector} from "../../redux/store/store";

const CartIcon = () => {
    const dispatch = useAppDispatch()
    const {cartCount} = useAppSelector(state => state.carts);


    useEffect(() => {
    }, [cartCount])

    return (
        <div className={'cart-icon-container'} onClick={() => dispatch(setCartOpen())}>
            <ShoppingIcon className={'shopping-icon'}/>
            <span className={'item-count'}>{cartCount}</span>
        </div>
    );
};

export default CartIcon;
