import React from 'react'
import { Link } from "react-router-dom"
import useAuth from '../hooks/useAuth'

const Home = () => {
    const { user, isAuthenticated } = useAuth()
    return (
        <>
            <h1>user:{JSON.stringify(user)}</h1>
            <h1>isAuthenticated:{JSON.stringify(isAuthenticated)}</h1>
            <Link to="signIn" >
                <h2>
                    SignIN
               </h2>
            </Link>
            <Link to="signUp">
                <h2>
                    signUp
                </h2>
            </Link>
            <Link to="Dashboard">
                <h2>
                    Dashboard
                </h2>
            </Link>
        </>
    )
}

export default Home
