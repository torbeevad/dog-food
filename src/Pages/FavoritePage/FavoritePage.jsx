import React, {useContext} from "react";
import {ValueContext} from "../../ValueContext/ValueContext";
import {QueryFind} from "../../Components/QueryFind/QueryFind";
import {Catalog} from "../../Components/Catalog/Catalog";
import {Page404} from "../Page404/Page404";

export const FavoritePage = () => {

    const {favorites} = useContext(ValueContext)

    return <main>
        <QueryFind cards={favorites}/>
        {favorites.length !== 0 ?
            <>
                {/*<Sort cards={favorites} setFunc={setFavorites}/>*/}
                <Catalog cards={favorites}/>
            </> :
            <Page404/>}
    </main>

}