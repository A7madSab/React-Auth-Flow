import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import useAuth from '../hooks/useAuth'

const SignUp = () => {
    const [form, setForm] = useState({ userName: "", name: "", lastName: "", email: "", password: "" })
    const history = useHistory()
    const { register } = useAuth()

    const handleSignUp = async () => {
        const res = await register(form.name, form.userName, form.email, form.password)
        if (res) {
            history.push("/SignIn")
        } else {
            console.log("Error")
        }
    }

    return (
        <div>
            <h1>SignUp</h1>
            
            <input placeholder="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input placeholder="userName" value={form.userName} onChange={e => setForm({ ...form, userName: e.target.value })} />
            <input placeholder="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <input placeholder="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            <button onClick={handleSignUp}>SignUp</button>

            <Link to="/">
                <h4>Back</h4>
            </Link>
        </div>
    )
}

export default SignUp
