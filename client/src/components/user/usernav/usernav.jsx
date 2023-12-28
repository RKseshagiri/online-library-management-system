import './usernav.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserNav = ({ username }) => {
  const nav = useNavigate();

  return (
    <div className="user-nav-container">
      <ul className="user-nav-ul">
        <li className="user-nav-li" onClick={() => nav(`/userdashboard/${username}`)}>
          Home
        </li>
        <li className="user-nav-li" onClick={() => nav(`/catalog/${username}`)}>
          Catalog
        </li>
        <li className="user-nav-li" onClick={() => nav(`/personalTransaction/${username}`)}>
          My transaction
        </li>
        <li className="user-nav-li" onClick={() => nav('/')}>
          Log out
        </li>
      </ul>
    </div>
  );
};

export default UserNav;
