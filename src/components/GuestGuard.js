import React from "react"
import { Redirect, Route } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const PublicRoute = ({ component: Component, path, ...rest }) => {
    const { isAuthenticated } = useAuth()

    if (isAuthenticated) {
        return <Redirect to="/Dashboard" />
    }

    const render = props => <Component {...props} />

    return <Route path={path} render={render} {...rest} />
}

export default PublicRoute
