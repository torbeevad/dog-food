import React, {useCallback} from "react";
import "./index.css"
import {ReactComponent as Clear} from "../../assets/ic-close-input.svg";
import {useDispatch, useSelector} from "react-redux";
import {setSearchValue} from "../../Storage/slices/productsSlice";


export const Search = () => {

    const dispatch = useDispatch()

    const {searchValue} = useSelector(state => state.products)

    const inputValue = useCallback((e) => {
        if (e.target.value === undefined) return
        dispatch(setSearchValue(e.target.value))
    }, [dispatch])

    const clearInput = useCallback((e) => {
        dispatch(setSearchValue(""))
    }, [dispatch])

    return (
        <div className="header__search">
            <input onChange={inputValue} className="header__input" type={"text"} value={searchValue} placeholder="search"/>
            <span className="header__close-btn"><Clear onClick={clearInput}/></span>
        </div>
    )
}