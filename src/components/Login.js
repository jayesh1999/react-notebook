import React, { useState } from 'react'
import {useNavigate  } from 'react-router-dom'

export default function Login(props) {
    const host = "http://localhost:5000"

    const [Credentials, setCredentials] = useState({ email: "", password: "" })
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: Credentials.email, password: Credentials.password })
        });
        const json = await response.json();
        if(json.success){
            //save to token in session and redirect
            localStorage.setItem("token",json.authtoken)
            history("/")
            props.showAlert("Account LoggedIn Successfully","success")
        }
        else{
            props.showAlert("invalid credentials","danger")
        }
    }

    onchange = (e) => {
        e.preventDefault();
        setCredentials({ ...Credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="container">
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={Credentials.email} onChange={onchange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" minLength={5} className="form-control" value={Credentials.password} onChange={onchange} name='password' id="password" />
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}
