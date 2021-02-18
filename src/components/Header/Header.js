import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Logo from "../../assets/logo.png";
import { signOutUserStart } from "../../redux/User/user.actions";
import { selectCartItemsCount } from "../../redux/Cart/cart.selectors";

const mapState = (state) => {
  return {
    currentUser: state.user.currentUser,
    totalCartItems: selectCartItemsCount(state),
  };
};

const Header = (props) => {
  const dispatch = useDispatch();
  const { currentUser, totalCartItems } = useSelector(mapState);

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  return (
    <header className="header">
      <div className="wrapper">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>

        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </nav>

        <div className="callToActions">
          <ul>
            <li>
              <Link to="/cart">Your Cart ({totalCartItems})</Link>
            </li>

            {currentUser
              ? [
                  <li key={1}>
                    <Link to="/dashboard">My account</Link>
                  </li>,
                  <li key={2}>
                    <span onClick={() => signOut()}>Logout</span>
                  </li>,
                ]
              : [
                  <li key={1}>
                    <Link to="/registration">Register</Link>
                  </li>,
                  <li key={2}>
                    <Link to="/login">Login</Link>
                  </li>,
                ]}
          </ul>
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
