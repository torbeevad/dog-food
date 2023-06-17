import React, {memo, useCallback, useContext} from "react";
import {Logo} from "../Logo/Logo";
import "./index.css"
import {Search} from "../Search/Search";
import {ReactComponent as Fav} from "./img/Favorites.svg"
import {ReactComponent as Cart} from "./img/Cart.svg"
import {ReactComponent as Face} from "./img/Face.svg"
import {Link} from "react-router-dom";
import {ValueContext} from "../../ValueContext/ValueContext";
import {ReactComponent as Menu} from "./img/Menu.svg";
import {useSelector} from "react-redux";

export const Header = memo(() => {

    const {setActiveModal} = useContext(ValueContext)

    const {favorites} = useSelector(state => state.products)
    const {isLogin} = useSelector(state => state.user)



    const clickActive = useCallback(() => {
        setActiveModal(true)
    }, [setActiveModal])

    return <header>
        <div className="wrapper">
            <Link className="header__logo" to={"/"}><Logo/></Link>
            {isLogin && <Search/>}
            <div className="buttons">
                <Link to={"/favorites"}>
                    <div className="bubble__wrapper"><Fav className="button__favorite"></Fav>
                        {!!favorites.length && <span className="bubble">{favorites.length}</span>}</div>
                </Link>
                <Link to={"/profile"}>
                    <div className="bubble__wrapper"><Cart className="button__cart"/>
                        <span className="bubble">12</span></div>
                </Link>
                <Link to={"/authorization"} onClick={clickActive} className="bubble__wrapper">
                    <Face className="button__face"/>
                </Link>
            </div>
            <div className="menu">
                <Menu className="menu__icon"/>
            </div>

        </div>
    </header>
})