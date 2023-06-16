import React from "react";
import {useSelector} from "react-redux";

export const Profile = () => {

    const {user} = useSelector(s => s.user)

    return <main>

        <span>{user.name}</span>

    </main>
}