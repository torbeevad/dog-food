import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {ValueContext} from "../../ValueContext/ValueContext";
import {QueryFind} from "../../Components/QueryFind/QueryFind";
import {Sort} from "../../Components/Sort/Sort";
import {Catalog} from "../../Components/Catalog/Catalog";

export const HomePage = () => {

    const {debounceValueInApp, products, setProducts} = useContext(ValueContext)


    return <main>

        {
            debounceValueInApp
                ? <>
                    <QueryFind cards={products}/>
                    <Sort cards={products} setFunc={setProducts}/>
                    <Catalog cards={products}/>
                </>
                : <button><Link to={"/catalog"}>Каталог ></Link></button>
        }
    </main>
}