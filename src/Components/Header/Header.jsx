import React from "react";
import {Logo} from "../Logo/Logo";
import "./index.css"
import {Search} from "../Search/Search";
import {ReactComponent as Fav} from "./img/Favorites.svg"
import {ReactComponent as Cart} from "./img/Cart.svg"
import {ReactComponent as Face} from "./img/Face.svg"
import {Link} from "react-router-dom";

export const Header = (props) => {

    const setSearchQuery = (path) => {
        props.setSearch(path)
    }

    return <header>
        <div className="wrapper">
            <Link className="header__logo" to={"/"}><Logo/></Link>
            <Search setSearch={setSearchQuery}/>
            <div className="buttons">
                <div className="bubble__wrapper"><Fav className="bubble__favorite"></Fav>
                    <span className="bubble">12</span></div>
                <div className="bubble__wrapper"><Cart className="bubble__cart"/>
                    <span className="bubble">12</span></div>
                <div className="bubble__wrapper"><Face className="bubble__face"/>
                </div>

            </div>
        </div>
    </header>
}