import React, {useEffect, useState} from "react";
import "./App.css";
import {Header} from "./Components/Header/Header";
import {Footer} from "./Components/Footer/Footer";
import {Route, Routes} from "react-router-dom";
import {CatalogPage} from "./Pages/CatalogPage/CatalogPage";
import {ProductPage} from "./Pages/ProductPage/ProductPage";
import {FavoritePage} from "./Pages/FavoritePage/FavoritePage";
import {Page404} from "./Pages/Page404/Page404";
import {useDebounce} from "./hooks/useDebounce";
import {ValueContext} from "./ValueContext/ValueContext";
import {Modal} from "./Components/Modal/Modal";
import {AuthorizationForm} from "./Components/Form/AuthorizationForm/AuthorizationForm";
import {RegistrationForm} from "./Components/Form/RegistrationForm/RegistrationForm";
import {ForgotPassForm} from "./Components/Form/ForgotPassForm/ForgotPassForm";
import {useDispatch, useSelector} from "react-redux";
import {Profile} from "./Components/Profile/Profile";
import {fetchGetUserInfo, setIsLogin} from "./Storage/slices/userSlice";
import {fetchGetAllProducts, fetchSearchProduct} from "./Storage/slices/productsSlice";
import {CartPage} from "./Pages/CartPage/CartPage";
import {cartFromLocal} from "./Storage/slices/cartSlice";
import {fetchGetAllReviews} from "./Storage/slices/reviewsSlice";
import {PrivateRoute} from "./Utils/router/PrivateRoute";
import {ResetPassForm} from "./Components/Form/ResetPassFrom/ResetPassForm";

function App() {

    const [activeModal, setActiveModal] = useState(true)
    const dispatch = useDispatch()
    const {isLogin} = useSelector(state => state.user)
    const {searchValue} = useSelector(state => state.products)
    const debounceValueInApp = useDebounce(searchValue)

    const valueContext = {
        activeModal,
        setActiveModal,
    }

    useEffect(() => {
        if (isLogin && localStorage.getItem("cart")) {
            dispatch(cartFromLocal(JSON.parse(localStorage.getItem("cart"))))
        }
    }, [dispatch, isLogin])


    useEffect(() => {
        if (isLogin) {
            dispatch(fetchGetUserInfo()).then(() => dispatch(fetchGetAllProducts()))
        }
    }, [dispatch, isLogin]);

    useEffect(() => {
        if (isLogin && debounceValueInApp !== undefined) {
            dispatch(fetchSearchProduct(debounceValueInApp))
        }
    }, [debounceValueInApp, dispatch, isLogin])

    useEffect(() => {
        isLogin && dispatch(fetchGetAllReviews())
    }, [dispatch, isLogin])

    useEffect(() => {
        if (localStorage.getItem("token")) {
            dispatch(setIsLogin(true))
        }
    }, [dispatch])

    return (
        <div className="App">
            <ValueContext.Provider value={valueContext}>
                <Header/>
                <main>
                    <Routes>
                        <Route element={<PrivateRoute/>}>
                            <Route path={"/"} element={<CatalogPage/>}/>
                            <Route path={"/product/:id"} element={<ProductPage/>}/>
                            <Route path={"/favorites"} element={<FavoritePage/>}/>
                            <Route path={"/cart"} element={<CartPage/>}/>
                            <Route path={"/profile"} element={<Profile/>}/>
                        </Route>
                        <Route path={"/registration"} element={<Modal><RegistrationForm/></Modal>}/>
                        <Route path={"/authorization"} element={<Modal><AuthorizationForm/></Modal>}/>
                        <Route path={"/forgot"} element={<Modal><ForgotPassForm/></Modal>}/>
                        <Route path={"/reset"} element={<Modal><ResetPassForm/></Modal>}/>
                        <Route path={"*"} element={<Page404/>}/>
                    </Routes>
                </main>
                <Footer/>
            </ValueContext.Provider>
        </div>
    );
}


export default App;