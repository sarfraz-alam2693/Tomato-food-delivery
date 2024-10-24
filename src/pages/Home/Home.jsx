import React, { useState } from "react";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import AppDownload from "../../components/AppDownload/AppDownload";
import Navbar from "../../components/Navbar/Navbar";
import LoginPopup from "../../components/LoginPopup/LoginPopup";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <Navbar setShowLogin={setShowLogin} />
      <Header />
      <ExploreMenu />
      <AppDownload />
    </div>
  );
};

export default Home;
