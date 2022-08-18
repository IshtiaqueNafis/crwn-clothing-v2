import React from 'react';
import {Link, Outlet} from "react-router-dom";
import {ReactComponent as CrwnLogo} from "../../assests/crown.svg";
import './navigation.styles.scss'
const Navigation = () => {
    return (
        <>
            <div className={'navigation'}>
                <Link className={'logo-container'} to={'/'}>
                    <CrwnLogo className={'logo'}/>

                </Link>
                <div className={'links-container'}>
                    <Link className={'nav-link'} to={'/shop'}>
                        SHOP
                    </Link>
                </div>
            </div>
            <Outlet/>
        </>
    );
};

export default Navigation;
