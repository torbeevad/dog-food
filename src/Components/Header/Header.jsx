import React, {useContext} from "react";
import {Logo} from "../Logo/Logo";
import "./index.css"
import {Search} from "../Search/Search";
import {ReactComponent as Fav} from "./img/Favorites.svg"
import {ReactComponent as Cart} from "./img/Cart.svg"
import {ReactComponent as Face} from "./img/Face.svg"
import {Link} from "react-router-dom";
import {ValueContext} from "../../ValueContext/ValueContext";

export const Header = () => {

    const {setSearch, favorites, search} = useContext(ValueContext)

    const setSearchQuery = (path) => {
        setSearch(path)
    }




    return <header>
        <div className="wrapper">
            <Link className="header__logo" to={"/"}><Logo/></Link>
            <Search search={search} setSearch={setSearchQuery}/>
            <div className="buttons">
                <Link to={"/favorites"}>
                    <div className="bubble__wrapper"><Fav className="button__favorite"></Fav>
                        {!!favorites.length && <span className="bubble">{favorites.length}</span>}</div>
                </Link>
                <Link to={"/cart"}>
                    <div className="bubble__wrapper"><Cart className="button__cart"/>
                        <span className="bubble">12</span></div>
                </Link>
                <div className="bubble__wrapper"><Face className="button__face"/>
                </div>

            </div>
        </div>
    </header>
}