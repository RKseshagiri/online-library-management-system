import React ,{ useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const nav = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error,setError] = useState()
  const handleChange = (e) => {
    e.preventDefault();
    setCredentials((prevdata) => ({
      ...prevdata,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = credentials;
    try {
      const res = await axios.post("http://localhost:5000/users/login", {
        username: username,
        password: password,
      });
      if (res.status === 200) {
        const { data: { role } } = res;
        return role === "admin" ? nav(`/admindashboard`) : nav(`/userdashboard/${username}`);
      }
      else setError('check with Admin')
    } catch (error) {
      setError('Invalid user or password')
      console.log(error.message);
    }
  };
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="login-username-container">
          <label htmlFor="inpt-username">Username</label>
          <input
            name="username"
            className="inpt-username"
            type="text"
            value={credentials.username}
            placeholder="Username"
            onChange={handleChange}
            required
          />
        </div>
        <div className="login-password-container">
          <label htmlFor="inpt-password">Password</label>
          <input
            name="password"
            className="inpt-password"
            type="password"
            value={credentials.password}
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </div>
        {error?<p>{error}</p>:''}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
