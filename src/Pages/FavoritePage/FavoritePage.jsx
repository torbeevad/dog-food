import React from "react";
import {Card} from "../../Components/Card/Card"

export const FavoritePage = ({favorites, user, handleLike}) => {

    return <main>
        <div className="wrapper">
            {favorites.map(el => {
                return <Card key={el._id} user={user} props={el} handleLike={handleLike}/>
            })}
        </div>
    </main>

}