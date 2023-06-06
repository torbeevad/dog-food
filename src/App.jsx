import React, {useEffect, useState} from "react";
import './App.css';
import {Header} from "./Components/Header/Header";
import {Footer} from "./Components/Footer/Footer";
import {Routes, Route} from "react-router-dom";
import {CatalogPage} from "./Pages/CatalogPage/CatalogPage";
import {ProductPage} from "./Pages/ProductPage/ProductPage";
import {FavoritePage} from "./Pages/FavoritePage/FavoritePage";
import {Page404} from "./Pages/Page404/Page404";
import {addLike, deleteLike, getProducts, getUser, searchProducts} from "./Utils/api";
import {useDebounce} from "./hooks/useDebounce";
import {ValueContext} from "./ValueContext/ValueContext";


function App() {

    const [search, setSearch] = useState(undefined)
    const [products, setProducts] = useState([])
    const [user, setUser] = useState({})
    const debounceValueInApp = useDebounce(search)
    const [favorites, setFavorites] = useState([])

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
        setProducts
    }

    useEffect(() => {
        setFavorites(products.filter(e => e.likes.includes(user._id)))
    }, [products, user._id])

    useEffect(() => {
        if (debounceValueInApp === undefined) return
        searchProducts(debounceValueInApp).then(res => {
            setProducts(res)
        })
    }, [debounceValueInApp])

    useEffect(() => {
        Promise.all([getProducts(), getUser()]).then(([products, user]) => {
            setProducts(products);
            setUser(user);
        });
    }, [])

    return (
        <div className="App">
            <ValueContext.Provider value={valueContext}>
                <Header/>
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