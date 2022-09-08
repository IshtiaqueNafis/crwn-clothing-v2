import React from 'react';
import {Controller} from "react-hook-form";
import './form-input.styles.scss'

const FormInput = ({inputOptions}) => {

    return (
        <div className={'group'}>
            <Controller name={inputOptions.name}
                        control={inputOptions.control}
                        defaultValue={inputOptions.defaultValue}
                        render={({field}) =>
                            <>
                                <input className={'form-input'} type={inputOptions.type} {...field}/>
                                <label className={`${field?.value?.length ? 'shrink' : ""} form-input-label`}>{inputOptions.label}</label>
                            </>
                        }

            />

        </div>

    );
};

export default FormInput;
