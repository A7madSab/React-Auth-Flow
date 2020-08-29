import React, { useState } from "react"
import useAuth from "../hooks/useAuth"
import { Link } from "react-router-dom"

const SignIn = () => {
    const [form, setForm] = useState({ userName: "", password: "" })
    const { login } = useAuth()

    const handleSignIn = async () => {
        await login(form.userName, form.password)
    }
    return (
        <div>
            <div>
                <h1>SignIn</h1>
                <input placeholder="username" value={form.userName} onChange={e => setForm({ ...form, userName: e.target.value })} />
                <input placeholder="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                <button onClick={handleSignIn}>SignIN</button>

                <Link to="/">
                    <h4>Back</h4>
                </Link>
            </div>
        </div>
    )
}

export default SignIn