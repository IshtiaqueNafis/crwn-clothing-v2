import Home from "./routes/home/home.component";
import {Route, Routes} from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import CheckOut from "./routes/checkout/checkout.component";
import React, {useEffect} from "react";
import {createUserDocumentFromAuth, onAuthStateChangeListener} from "./utlis/firebase/firebase.utils";
import {useAppDispatch} from "./redux/store/store";
import {setUser} from "./redux/reducer/userSliceReducer";


const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {

        onAuthStateChangeListener(async user => {
            if (user) {
                if (user.providerData[0].providerId === "google.com") {
                    await createUserDocumentFromAuth(user);
                    dispatch(setUser(user.uid));
                } else {
                    dispatch(setUser(user.uid));

                }
            }
        })


    }, [dispatch])


    return (
        <Routes>
            <Route path={'/'} element={<Navigation/>}>
                <Route index element={<Home/>}/>
                <Route path={'auth'} element={<Authentication/>}/>
                <Route path={'shop/*'} element={<Shop/>}/>
                <Route path={'checkout'} element={<CheckOut/>}/>
            </Route>
        </Routes>
    );
};

export default App;
