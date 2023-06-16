import React, {useCallback, useContext} from "react";
import "./index.css"
import {ReactComponent as Clear} from "./img/ic-close-input.svg";
import {ValueContext} from "../../ValueContext/ValueContext";


export const Search = () => {

    const {search, setSearch} = useContext(ValueContext)

    const inputValue = useCallback((e) => {
        if (e.target.value === "") return
        setSearch(e.target.value)
    }, [setSearch])

    const clearInput = useCallback(() => {
        setSearch("")
    }, [setSearch])

    return (
        <div className="header__search">
            <input onChange={inputValue} className="header__input" type={"text"} value={search} placeholder="search"/>
            <span className="header__close-btn"><Clear onClick={clearInput}/></span>
        </div>
    )
}