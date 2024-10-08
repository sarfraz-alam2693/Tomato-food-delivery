import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>order your favourite Food here</h2>
        <p>
          An online food ordering system is a digital platform that allows
          customers to order food from a restaurant via the Internet. This
          system can be integrated into a restaurant's website or through a
          third-party application{" "}
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
