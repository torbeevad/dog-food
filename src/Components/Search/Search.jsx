import React from "react";
import "./index.css"
import {ReactComponent as Clear} from "./img/ic-close-input.svg";


export const Search = ({search, setSearch}) => {

    const clearInput = () => {
        setSearch("")
    }

    return <div className="header__search">
        <input className="header__input" value={search} type="text" placeholder="search"
               onChange={(e) => setSearch(e.target.value)}/>
        <span onClick={clearInput} className="header__close-btn"><Clear/></span>

    </div>

}