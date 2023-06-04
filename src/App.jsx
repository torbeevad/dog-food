import React, {useEffect, useState} from "react";
import './App.css';
import {Header} from "./Components/Header/Header";
import {Footer} from "./Components/Footer/Footer";
import {Routes, Route} from "react-router-dom";
import {CatalogPage} from "./Pages/CatalogPage/CatalogPage";
import {ProductPage} from "./Pages/ProductPage/ProductPage";
import {Page404} from "./Pages/Page404/Page404";
import {getProducts, searchProducts} from "./Utils/api";

function App() {

    const [search, setSearch] = useState(undefined)

    const [products, setProducts] = useState([])
    console.log(products[0])

    useEffect(() => {
        searchProducts(search).then(res => setProducts(res))
    }, [search])

    useEffect(() => {
        getProducts().then(res => setProducts(res));
    }, [])

    return (
        <div className="App">
            <Header setSearch={setSearch}/>
            <Routes>
                <Route path="/" element={<CatalogPage products={products} setProducts={setProducts} search={search}/>}/>
                <Route path="/product/:id" element={<ProductPage/>}/>
                <Route path="*" element={<Page404/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;