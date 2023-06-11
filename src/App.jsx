import React, {useEffect, useState} from "react";
import './App.css';
import {Header} from "./Components/Header/Header";
import {Footer} from "./Components/Footer/Footer";
import {Route, Routes} from "react-router-dom";
import {CatalogPage} from "./Pages/CatalogPage/CatalogPage";
import {ProductPage} from "./Pages/ProductPage/ProductPage";
import {FavoritePage} from "./Pages/FavoritePage/FavoritePage";
import {Page404} from "./Pages/Page404/Page404";
import {addLike, deleteLike, getProducts, getUser, searchProducts} from "./Utils/api";
import {useDebounce} from "./hooks/useDebounce";
import {ValueContext} from "./ValueContext/ValueContext";
import {Modal} from "./Components/Modal/Modal";
import {AuthorizationForm} from "./Components/Form/AuthorizationForm/AuthorizationForm";


function App() {

    const [search, setSearch] = useState("")
    const [products, setProducts] = useState([])
    const [user, setUser] = useState({})
    const debounceValueInApp = useDebounce(search)
    const [favorites, setFavorites] = useState([])
    const [activeModal, setActiveModal] = useState(false)
    const [childrenForm, setChildrenForm] = useState(<AuthorizationForm/>)


    const handleLike = async (card, isLiked) => {
        const result = isLiked ? await deleteLike(card._id) : await addLike(card._id)
        const updateList = products.map(e => e._id === result._id ? result : e)
        setProducts(updateList)
    }

    const valueContext = {
        products,
        user,
        handleLike,
        favorites,
        search,
        setSearch,
        debounceValueInApp,
        setProducts,
        activeModal,
        setActiveModal,
        childrenForm,
        setChildrenForm,
        setFavorites,
    }

    const filterUser = (arr) => {
        return arr.filter(e => e.author._id !== "644ce0a78fbc473fa89fe20e")
    }

    useEffect(() => {
        setFavorites(products.filter(e => e.likes.includes(user._id)))
    }, [products, user._id])

    useEffect(() => {
        searchProducts(debounceValueInApp).then(res => {  // <--  вот это возвращает разные значения при одних параметрах !!!!!!!!!!!!!!!!!!!!!!
            setProducts(res)
        }).catch(error => console.log(error))
    }, [debounceValueInApp])

    useEffect(() => {
        Promise.all([getProducts(), getUser()]).then(([products, user]) => {
            setProducts(filterUser(products));
            setUser(user);
        }).catch(e=> console.log(e));
    }, [])

    return (
        <div className="App">
            <ValueContext.Provider value={valueContext}>
                <Header/>
                <Modal/>
                <Routes>
                    <Route path="/" element={<CatalogPage/>}/>
                    <Route path="/product/:id" element={<ProductPage/>}/>
                    <Route path="/favorites" element={<FavoritePage/>}/>
                    <Route path="*" element={<Page404/>}/>
                </Routes>
                <Footer/>
            </ValueContext.Provider>
        </div>
    );
}

export default App;