import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../Logo/Logo";
import classes from "./SideDrawer.css";
import Aux from "../../../hoc/Auxillary";
import BackDrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = (props) => {
  let assignedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    assignedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <BackDrop show={props.open} clicked={props.toggle} />
      <div className={assignedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuth={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
