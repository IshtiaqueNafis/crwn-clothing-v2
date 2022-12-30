import React, {useEffect} from 'react';
import {Link, Outlet} from "react-router-dom";
import {ReactComponent as CrwnLogo} from "../../assests/crown.svg";
import './navigation.styles.scss'
import {signOutUserAsync} from "../../redux/reducer/userSliceReducer";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";
import {useAppDispatch, useAppSelector} from "../../redux/store/store";

const Navigation = () => {
    const dispatch = useAppDispatch();
    const {currentUser} = useAppSelector(state => state.userState);
    const {isCartOpen} = useAppSelector(state => state.carts);
    useEffect(() => {

    }, [currentUser])


    return (
        <>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrwnLogo className='logo'/>
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>


                    {currentUser?.email ? (
                        <span className='nav-link' onClick={() => dispatch(signOutUserAsync())}>
              {' '}
                            SIGN OUT{' '}
            </span>
                    ) : (
                        <Link className='nav-link' to='/auth'>
                            SIGN IN
                        </Link>
                    )}
                    <CartIcon/>
                </div>
                {isCartOpen && <CartDropDown/>}

            </div>
            <Outlet/>
        </>
    );
};

export default Navigation;
