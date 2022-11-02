import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux/store/store";
import {persistStore} from "redux-persist";
import {PersistGate} from "redux-persist/integration/react";
import {Elements} from "@stripe/react-stripe-js";
import {stripePromise} from "./utlis/stripe/stripe.utils";

let persist = persistStore(store);

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persist}>
                    <Elements stripe={stripePromise}>

                        <App/>
                    </Elements>
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);


reportWebVitals();
