import React from 'react'
import useAuth from '../hooks/useAuth'
import { useHistory } from 'react-router-dom'

const Dashboard = () => {
    const { logout } = useAuth()
    const history = useHistory()
    return (
        <>
            <h2>Dashboard</h2>


            <button onClick={() => history.push("/")}>
                Home
            </button>

            <button onClick={() => logout()}>
                logout
            </button>
        </>
    )
}

export default Dashboard
