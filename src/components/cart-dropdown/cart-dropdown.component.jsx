import React from 'react';
import "./cart-dropdown.styles.scss"
import Button from "../button/button.component";
import {Link} from "react-router-dom";

const CartDropDown = () => {
    return (
        <div className={'cart-dropdown-container'}>
            <div className={'cart-items'}>
               <Link to={'/checkout'}>go to checkout</Link>
            </div>

        </div>
    );
};

export default CartDropDown;
