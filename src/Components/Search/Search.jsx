import React from "react";
import "./index.css"


export const Search = ({setSearch}) => {
    return <input type="text" placeholder="search" onChange={(e) => setSearch(e.target.value)}/>
}