import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationElements from "../NavigationItems/NavigationItems";
import { Link } from "react-router-dom";

const Toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <div className={classes.DrawerToggle} onClick={props.toggle}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={classes.Logo}>
        <Link to="/">
          {" "}
          <Logo />
        </Link>
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationElements isAuth={props.isAuth} />
      </nav>
    </header>
  );
};

export default Toolbar;
