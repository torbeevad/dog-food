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


function App() {

    const [search, setSearch] = useState(undefined)
    const [products, setProducts] = useState([])
    const [user, setUser] = useState({})
    const debounceValueInApp = useDebounce(search)
    const [favorites, setFavorites] = useState([])

    const handleLike = async (props, isLiked) => {
        const result = isLiked ? await deleteLike(props._id) : await addLike(props._id)
        const updateList = products.map(e => e._id === result._id ? result : e)
        setProducts(updateList)
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
            <Header favorites={favorites} search={search} setSearch={setSearch}/>
            <Routes>
                <Route path="/"
                       element={<CatalogPage handleLike={handleLike} products={products} setProducts={setProducts}
                                             search={debounceValueInApp} user={user}/>}/>
                <Route path="/product/:id" element={<ProductPage/>}/>
                <Route path="/favorites"
                       element={<FavoritePage favorites={favorites} handleLike={handleLike} user={user}/>}/>
                <Route path="*" element={<Page404/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;