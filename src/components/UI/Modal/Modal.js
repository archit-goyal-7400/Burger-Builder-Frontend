import React from "react";
import classes from "./Modal.css";
import Aux from "../../../hoc/Auxillary";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends React.Component {
  // shouldComponentUpdate(newProps, newState) {
  //   return (
  //     this.props.show !== newProps.show ||
  //     this.props.children !== newProps.children
  //   );
  // }
  componentDidUpdate(prevProps, prevState) {
    console.log("modal updated...");
  }
  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalCancel} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
