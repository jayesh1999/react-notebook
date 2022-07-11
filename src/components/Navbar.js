import React from 'react'
import {Link ,useLocation,useNavigate} from "react-router-dom";

export default function Navbar(props) {
    let location = useLocation();
    let history =useNavigate();
   
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">iNoteBook</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item ">
                        <Link className={`nav-link ${location.pathname === "/"? "active":"" }`} to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/about"? "active":"" }`} to="/about">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/contactus"? "active":"" }`} to="/contactus">Contact-Us</Link>
                    </li>
                   
                </ul>
                {!localStorage.getItem("token")?<form className="form-inline my-2 my-lg-0">
                <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>   
                </form>:<button type ="button" className='btn btn-primary'onClick={()=>{localStorage.removeItem("token");history("/login"); props.showAlert("Signout Successfully","success")}}>Signout</button>
}
            </div>
        </nav>
    )
}
