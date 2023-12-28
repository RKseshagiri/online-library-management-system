import './register.css'
import React, { useState } from "react";
import Nav from "../admin/adminnav/nav";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const Register = () => {
  const[error,setError] = useState()
  const nav = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    name: "",
    email: "",
    contactNumber: "",
    password: "",
    role: {
      admin: "admin",
      user: "user",
    },
  });
  const handleChange = (e) => {
    e.preventDefault();
    setCredentials((prevdata) => ({
      ...prevdata,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/users/register',{credentials})
      if(res.status===201){
       return nav('/admindashboard')
      }
    } catch (error) {
      setError('Username or Email already exist')
      console.log(error.message);
    }

  }
  return (
    <div>
      <Nav />
      <div className="register-container">
        <form onSubmit={handleSubmit}>
          <div className="register-username-container">
            <label htmlFor="username">Username</label><br/>
            <input
              name="username"
              className="register-username"
              type="text"
              value={credentials.username}
              placeholder="Username"
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-name-container">
            <label htmlFor="name">Name</label><br/>
            <input
              name="name"
              className="register-name"
              type="text"
              value={credentials.name}
              placeholder="Name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-email-container">
            <label htmlFor="email">Email</label><br/>
            <input
              type="email"
              name="email"
              className="register-email"
              value={credentials.email}
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-contactNumber-container">
            <label htmlFor="contactNumber">Contact Number</label><br/>
            <input
              type="text"
              name="contactNumber"
              className="register-contactNumber"
              value={credentials.contactNumber}
              placeholder="Contact Number"
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-password-container">
            <label htmlFor="password">Password</label><br/>
            <input
              type="password"
              name="password"
              className="register-password"
              value={credentials.password}
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-role-container">
            <label htmlFor="Role">Role</label>
            <select
              className="register-role-container"
              name="role"
              value={credentials.role}
              onChange={handleChange}
            >
              <option  value={credentials.role.user}>user</option>
              <option  value={credentials.role.admin}>admin</option>
            </select>
            {error?<p>{error}</p>:''}
            <button type="submit" className="btn-register">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;