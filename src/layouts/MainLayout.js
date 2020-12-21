import React from "react";
import Footer from "../components/Footer/Footer";

import Header from "../components/Header/Header";

const MainLayout = (props) => {
  return (
    <div>
      <Header />
      <div className="main">{props.children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
