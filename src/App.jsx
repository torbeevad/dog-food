import React, {useEffect, useState} from "react";
import './App.css';
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
import {ResetPassForm} from "./Components/Form/ResetPassFrom/ResetPassForm";
import {useDispatch, useSelector} from "react-redux";
import {Profile} from "./Components/Profile/Profile";
import {getUserInfo, setIsLogin} from "./Storage/slices/userSlice";
import {fetchGetAllProducts, fetchSearchProduct} from "./Storage/slices/productsSlice";
import {useNavigate} from "react-router";
import {CartPage} from "./Pages/CartPage/CartPage";
import {cartFromLocal} from "./Storage/slices/cartSlice";
import {fetchGetAllReviews} from "./Storage/slices/reviewsSlice";

function App() {

    const [activeModal, setActiveModal] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

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
            dispatch(getUserInfo()).then(() => dispatch(fetchGetAllProducts()))
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
        } else {
            setActiveModal(true);
            navigate("/authorization")
        }
    }, [dispatch, isLogin, navigate])

    return (
        <div className="App">
            <ValueContext.Provider value={valueContext}>
                <Header/>
                <main>
                    <Routes>
                        {isLogin ?
                            <>
                                <Route path={"/"} element={<CatalogPage/>}/>
                                <Route path={"/product/:id"} element={<ProductPage/>}/>
                                <Route path={"/favorites"} element={<FavoritePage/>}/>
                                <Route path={"/cart"} element={<CartPage/>}/>
                                <Route path={"/profile"} element={<Profile/>}/>
                                <Route path={"/registration"} element={<Modal><RegistrationForm/></Modal>}/>
                                <Route path={"/authorization"} element={<Modal><AuthorizationForm/></Modal>}/>
                                <Route path={"/reset"} element={<Modal><ResetPassForm/></Modal>}/>
                            </> :
                            <>
                                <Route path={"/registration"} element={<Modal><RegistrationForm/></Modal>}/>
                                <Route path={"/authorization"} element={<Modal><AuthorizationForm/></Modal>}/>
                                <Route path={"/reset"} element={<Modal><ResetPassForm/></Modal>}/>
                                <Route path={"/profile"} element={<Profile/>}/>
                                <Route path={"*"} element={<Page404/>}/>
                            </>}
                    </Routes>
                </main>
                <Footer/>
            </ValueContext.Provider>
        </div>
    );
}


export default App;