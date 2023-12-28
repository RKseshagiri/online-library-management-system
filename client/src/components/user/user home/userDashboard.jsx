import "./ud.css";
import React from "react";
import Nav from "../usernav/usernav";
import { useNavigate, useParams } from "react-router-dom";

const UserDashboard = () => {
  const { username } = useParams();
  const nav = useNavigate();

  return (
    <div>
      <Nav username={username} />
      <div className="user-dashboard-container">
        <div className="user-dashboard-card">
          <div
            className="user-dashboard-card-catalog"
            onClick={() => {
              nav(`/catalog/${username}`);
            }}
          >
            Catalog
          </div>
          <div
            className="user-dashboard-card-transaction"
            onClick={() => {
              nav(`/personalTransaction/${username}`);
            }}
          >
            My Transactions
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
