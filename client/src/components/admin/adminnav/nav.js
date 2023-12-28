import './Nav.css';
import React from 'react';
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav-container">
        <ul className="nav-ul">
            <li className="nav-li"><Link to="/admindashboard">Home</Link></li>
            <li className="nav-li"><Link to='/register'>register user</Link></li>
            <li className="nav-li"><Link to='/issuing'>issue book</Link></li>
            <li className="nav-li"><Link to='/returning'>return book</Link></li>
            <li className="nav-li"><Link to='/addbook'>Add book</Link></li>
            <li className="nav-li"><Link to='/removebook'>Remove book</Link></li>
            <li className="nav-li"><Link to='/'>log out</Link></li>
        </ul>
    </div>
  )
}

export default Nav