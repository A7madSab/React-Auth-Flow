import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import AuthGuard from "../components/AuthGuard"
import GuestGuard from "../components/GuestGuard"

import SignUp from "../screens/SignUp"
import SignIn from "../screens/SignIn"
import Home from "../screens/Home"
import Dashboard from "../screens/Dashboard"
import NotFound from "../screens/NotFound"

const Navigation = () => {
    return (
        <BrowserRouter>
            <Switch>

                <Route exact path="/" component={Home} />
                <AuthGuard path="/Dashboard" component={Dashboard} />
                <GuestGuard path="/SignUp" component={SignUp} />
                <GuestGuard path="/SignIn" component={SignIn} />
                <Route component={NotFound} />

            </Switch>
        </BrowserRouter>
    )
}

export default Navigation


// asjkd@jkasd.com