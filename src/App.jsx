import React, {useEffect} from "react";
import "./App.css";
import {Header} from "./Components/Header/Header";
import {Footer} from "./Components/Footer/Footer";
import {Route, Routes} from "react-router-dom";
import {CatalogPage} from "./Pages/CatalogPage/CatalogPage";
import {ProductPage} from "./Pages/ProductPage/ProductPage";
import {FavoritePage} from "./Pages/FavoritePage/FavoritePage";
import {Page404} from "./Pages/Page404/Page404";
import {useDebounce} from "./hooks/useDebounce";
import {Modal} from "./Components/Modal/Modal";
import {AuthorizationForm} from "./Components/Form/AuthorizationForm/AuthorizationForm";
import {RegistrationForm} from "./Components/Form/RegistrationForm/RegistrationForm";
import {ForgotPassForm} from "./Components/Form/ForgotPassForm/ForgotPassForm";
import {useDispatch, useSelector} from "react-redux";
import {ProfilePage} from "./Pages/ProfilePage/ProfilePage";
import {fetchGetUserInfo, setIsLogin, userFromLocal} from "./Storage/slices/userSlice";
import {fetchGetAllProducts, fetchSearchProduct, getMyProductsFromLocal} from "./Storage/slices/productsSlice";
import {CartPage} from "./Pages/CartPage/CartPage";
import {cartFromLocal} from "./Storage/slices/cartSlice";
import {fetchGetAllReviews} from "./Storage/slices/reviewsSlice";
import {PrivateRoute} from "./Utils/router/PrivateRoute";
import {ResetPassForm} from "./Components/Form/ResetPassFrom/ResetPassForm";
import {ProfileChangeForm} from "./Components/Form/ProfileChangeForm/ProfileChangeForm";

function App() {

    const dispatch = useDispatch()
    const {isLogin} = useSelector(state => state.user)
    const {searchValue} = useSelector(state => state.products)
    const debounceValueInApp = useDebounce(searchValue)

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            dispatch(setIsLogin(false));
        }
    }, [dispatch])

    useEffect(() => {
        if (localStorage.getItem("user")) {
            dispatch(userFromLocal())
        }
    }, [dispatch])

    useEffect(() => {
        if (isLogin && localStorage.getItem("cart")) {
            dispatch(cartFromLocal())
        }
    }, [dispatch, isLogin])

    useEffect(() => {
        if (isLogin && localStorage.getItem("myProducts")) {
            dispatch(getMyProductsFromLocal())
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

    return (
        <div className="App">
            <Header/>
            <main>
                <Routes>
                    <Route path="/" element={<PrivateRoute/>}>
                        <Route index element={<CatalogPage/>}/>
                        <Route path={"product/:id"} element={<ProductPage/>}/>
                        <Route path={"favorites"} element={<FavoritePage/>}/>
                        <Route path={"cart"} element={<CartPage/>}/>
                        <Route path={"profile"} element={<ProfilePage/>}/>
                        <Route path={"change"} element={<ProfileChangeForm/>}/>
                    </Route>
                    <Route path={"/registration"} element={<Modal><RegistrationForm/></Modal>}/>
                    <Route path={"/authorization"} element={<Modal><AuthorizationForm/></Modal>}/>
                    <Route path={"/forgot"} element={<Modal><ForgotPassForm/></Modal>}/>
                    <Route path={"/reset"} element={<Modal><ResetPassForm/></Modal>}/>
                    <Route path={"*"} element={<Page404/>}/>
                </Routes>
            </main>
            <Footer/>
        </div>
    );
}


export default App;