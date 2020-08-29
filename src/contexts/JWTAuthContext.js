import React, { createContext, useEffect, useReducer } from "react"
import jwtDecode from "jwt-decode"
import SplashScreen from "../screens/SplashScreen"
import axios from "../utils/axios"

const initialAuthState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null
}

const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false
    }

    const decoded = jwtDecode(accessToken)
    const currentTime = Date.now() / 1000

    return decoded.exp > currentTime
}

const setSession = (accessToken, user) => {
    if (accessToken) {
        localStorage.setItem("accessToken", accessToken)
        localStorage.setItem("user", user)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("user")
        delete axios.defaults.headers.common.Authorization
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case "INITIALISE": {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user
            }
        }
        case "LOGIN": {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user
            }
        }
        case "LOGOUT": {
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        }
        case "REGISTER": {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialAuthState,
    method: "JWT",
    login: () => Promise.resolve(),
    logout: () => { },
    register: () => Promise.resolve()
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialAuthState)

    const login = async (userName, password) => {
        const body = JSON.stringify({
            username: userName,
            password
        })
        const response = await axios.post(
            "account/token/",
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        const { access, refresh } = response.data

        const user = {
            userName: userName,
            access,
        }
        setSession(access, userName)
        dispatch({
            type: "LOGIN",
            payload: {
                user
            }
        })
    }

    const logout = () => {
        setSession(null)
        dispatch({ type: "LOGOUT" })
    }

    const register = async (name, userName, email, password) => {
        const response = await axios.post(
            "account/register/",
            {
                user: {
                    username: userName,
                    password: password,
                    email: email
                },
                name: name
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        if (response.statusText === "OK") {
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        const initialise = async () => {
            try {
                const accessToken = window.localStorage.getItem("accessToken")
                const user = window.localStorage.getItem("user")

                if (accessToken && isValidToken(accessToken)) {
                    setSession(accessToken, user)

                    dispatch({
                        type: "INITIALISE",
                        payload: {
                            isAuthenticated: true,
                            user
                        }
                    })
                } else {
                    dispatch({
                        type: "INITIALISE",
                        payload: {
                            isAuthenticated: false,
                            user: null
                        }
                    })
                }
            } catch (err) {
                console.error(err)
                dispatch({
                    type: "INITIALISE",
                    payload: {
                        isAuthenticated: false,
                        user: null
                    }
                })
            }
        }

        initialise()
    }, [])

    if (!state.isInitialised) {
        return <SplashScreen />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: "JWT",
                login,
                logout,
                register
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext