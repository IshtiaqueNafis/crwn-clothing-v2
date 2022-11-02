import React from 'react';
import "./button.styles.scss"

export const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
}

const Button = ({children, isLoading, buttonType, ...otherProps}) => {

    return (
        <button disabled={isLoading} className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>
            {children}
        </button>
    );
};

export default Button;
