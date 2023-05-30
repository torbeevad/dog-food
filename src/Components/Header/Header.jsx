import React from "react";
import {Logo} from "../Logo/Logo";
import "./index.css"
import {Search} from "../Search/Search";

export const Header = (props) => {

    const setSearchQuery = (path) => {
        props.setSearch(path)
    }

    return <header>
        <div className="wrapper">
            <Logo></Logo>
            <Search setSearch={setSearchQuery}/>
            <div>какие-то кнопки</div>
        </div>
    </header>
}