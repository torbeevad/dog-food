import React, {useEffect, useState} from "react";
import './App.css';
import {Header} from "./Components/Header/Header";
import {Footer} from "./Components/Footer/Footer";
import {Route, Routes} from "react-router-dom";
// import {HomePage} from "./Pages/HomePage/HomePage";
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
import {useDispatch} from "react-redux";
import {Profile} from "./Components/Profile/Profile";
import {getUserInfo} from "./Storage/slices/userSlice";
import {fetchGetAllProducts, fetchSearchProduct} from "./Storage/slices/productsSlice";

function App() {

    const [search, setSearch] = useState("")
    const debounceValueInApp = useDebounce(search)
    const [activeModal, setActiveModal] = useState(false)

    const dispatch = useDispatch()

    const valueContext = {

        search,
        setSearch,
        debounceValueInApp,
        activeModal,
        setActiveModal,
    }

    useEffect(() => {
        if (debounceValueInApp === undefined) return;
        dispatch(fetchSearchProduct(debounceValueInApp))
    }, [debounceValueInApp, dispatch])

    useEffect(() => {
        dispatch(getUserInfo()).then(() => dispatch(fetchGetAllProducts()))
    }, [dispatch]);

    return (
        <div className="App">
            <ValueContext.Provider value={valueContext}>
                <Header/>
                <main>
                    <Routes>
                        {/*<Route path={"/"} element={<HomePage/>}/>*/}
                        <Route path={"/"} element={<CatalogPage/>}/>
                        <Route path={"/product/:id"} element={<ProductPage/>}/>
                        <Route path={"/favorites"} element={<FavoritePage/>}/>
                        <Route path={"/registration"} element={<Modal><RegistrationForm/></Modal>}/>
                        <Route path={"/authorization"} element={<Modal><AuthorizationForm/></Modal>}/>
                        <Route path={"/reset"} element={<Modal><ResetPassForm/></Modal>}/>
                        <Route path={"/profile"} element={<Profile/>}/>
                        <Route path={"*"} element={<Page404/>}/>
                    </Routes>
                </main>
                <Footer/>
            </ValueContext.Provider>
        </div>
    );
}

export default App;