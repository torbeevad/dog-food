import React from "react";
import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router";

export const PrivateRoute = () => {
    const {isLogin} = useSelector(state => state.user)
    return isLogin ? <Outlet/> : <Navigate to="/authorization"/>
}