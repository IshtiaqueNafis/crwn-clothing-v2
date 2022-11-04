import React, {ButtonHTMLAttributes} from 'react';
import "./button.styles.scss"

export enum BUTTON_TYPE_CLASSES {
    google = 'google-sign-in',
    inverted = 'inverted',
    base = "base"
}

type ButtonProps = {

    isLoading?: boolean,

    buttonType: string

} &
    ButtonHTMLAttributes<HTMLButtonElement>


const Button = ({children, isLoading, buttonType, ...otherProps}: ButtonProps) => {

    return (
        <button disabled={isLoading} className={`button-container ${buttonType}`} {...otherProps}>
            {children}
        </button>
    );
};

export default Button;
