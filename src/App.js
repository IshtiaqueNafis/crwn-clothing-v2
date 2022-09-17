import Home from "./routes/home/home.component";
import {Route, Routes} from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import CheckOut from "./routes/checkout/checkout.component";

import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {createUserDocumentFromAuth, onAuthStateChangeListener} from "./utlis/firebase/firebase.utils";
import {setUser} from "./redux/reducer/userSliceReducer";
//https://stackoverflow.com/questions/66950349/onauthstatechanged-being-called-too-early

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {

           onAuthStateChangeListener( async user => {
               if (user) {

                   if (user.providerData[0].providerId === "google.com") {
                       await createUserDocumentFromAuth(user);
                       dispatch(setUser({uid:user.uid}))
                   }else {
                       dispatch(setUser({uid:user.uid}))
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
