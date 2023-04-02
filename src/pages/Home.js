/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate("/addcost");
    }
  }, [userInfo, navigate]);

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Cost Manager</h1>
          <p className="lead">
            Welcome! You can add your stuff and see other's in this site.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
