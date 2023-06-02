import React from "react";
import "./index.css"


export const Search = ({setSearch}) => {
    return <input className="header__search" type="text" placeholder="search" onChange={(e) => setSearch(e.target.value)}/>
}