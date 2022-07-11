import React, { useState } from 'react'
import {useNavigate  } from 'react-router-dom'
export default function Signup(props) {

    const host = "http://localhost:5000"

    const [SignCredentials, setSignCredentials] = useState({ name:"" ,email: "", password: "" })
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: SignCredentials.name, email: SignCredentials.email, password: SignCredentials.password })
        });
        const json = await response.json();
        if(json.success){
            //save to token in session and redirect
            localStorage.setItem("token",json.authtoken)
            history("/")
            props.showAlert("Account Created Successfully","success")
        }else{
            props.showAlert("invalid credentials","danger")
        }
      
    }


    onchange = (e) => {
        e.preventDefault();
        setSignCredentials({ ...SignCredentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} >
                <h1>Crete an account to use iNotebook</h1>
            <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
                    <input type="text" className="form-control" minLength={3} onChange={onchange} id="name" name="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={onchange} name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" minLength={5} onChange={onchange} id="password" name="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" minLength={5} onChange={onchange} id="password" name="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
