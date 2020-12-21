import React from "react";
import "./Header.scss";

import Logo from "../../assets/logo.png";

const Header = () => {
  return (
    <header className="header">
      <div className="wrapper">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;
