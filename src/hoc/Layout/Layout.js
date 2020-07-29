import React from "react";
import Aux from "../Auxillary";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

class Layout extends React.Component {
  state = {
    showSideDrawer: false,
  };

  toggleSideDrawerHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  componentDidUpdate() {
    console.log("avhgvsagdvghdfvghdvhgfgvfghvfghvfgvfvfvvdvgvgvkvb");
  }

  render() {
    return (
      <Aux>
        <Toolbar
          toggle={this.toggleSideDrawerHandler}
          isAuth={this.props.isAuthenticated}
        ></Toolbar>
        <SideDrawer
          open={this.state.showSideDrawer}
          toggle={this.toggleSideDrawerHandler}
          isAuth={this.props.isAuthenticated}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token != null,
  };
};

export default connect(mapStateToProps)(Layout);
