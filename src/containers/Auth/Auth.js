import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";

class Auth extends Component {
  state = {
    controls: {
      name: {
        elementType: "input",
        config: {
          type: "text",
          name: "name",
          placeholder: "Your Name",
        },
        value: "",
        validationRules: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        config: {
          type: "email",
          name: "email",
          placeholder: "E-MAIL",
        },
        value: "",
        validationRules: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        config: {
          type: "password",
          name: "password",
          placeholder: "PASSWORD",
        },
        value: "",
        validationRules: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignUp: true,
  };

  componentDidMount() {
    // this.props.onSetAuthSignin();
    if (!this.props.burgerBuilding && this.props.authRedirectPath !== "/") {
      this.props.onAuthRedirectPath("/");
    }
  }

  checkValidity(value, validationRules) {
    let valid = true;
    if (!validationRules) {
      return valid;
    }
    if (validationRules.required) {
      if (value.trim() === "") {
        valid = false;
      }
    }
    if (validationRules.minLength) {
      if (value.trim().length < validationRules.minLength) {
        valid = false;
      }
    }
    return valid;
  }

  inputChangeHandler = (event, identifier) => {
    const updatedControls = {
      ...this.state.controls,
      [identifier]: {
        ...this.state.controls[identifier],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[identifier].validationRules
        ),
        touched: true,
      },
    };
    this.setState({
      controls: updatedControls,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    if (!this.state.isSignUp) {
      this.props.onAuthSignin(
        this.state.controls.email.value,
        this.state.controls.password.value
      );
    } else {
      this.props.onAuthSignup(
        this.state.controls.name.value,
        this.state.controls.email.value,
        this.state.controls.password.value
      );
    }
  };

  switchHandler = () => {
    this.setState((prevState) => {
      return {
        isSignUp: !prevState.isSignUp,
      };
    });
  };

  render() {
    const ref = this.state.controls;
    let form = Object.keys(ref).map((type) => {
      if (type !== "name" || this.state.isSignUp) {
        return (
          <Input
            elementType={ref[type].elementType}
            elementConfig={ref[type].config}
            value={ref[type].value}
            key={type}
            touched={ref[type].touched}
            valid={!ref[type].valid}
            validation={ref[type].validationRules}
            changed={(event) => {
              this.inputChangeHandler(event, type);
            }}
          />
        );
      } else {
        return null;
      }
    });
    if (this.props.loading) {
      form = <Spinner />;
    }
    let errorMessage = null;
    console.log(this.props.error);
    if (this.props.error) {
      errorMessage = <p>{this.props.error}</p>;
    }
    let authRedirect = null;
    if (this.props.isAuth) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button btnType="Danger" clicked={this.switchHandler}>
          Switch To {this.state.isSignUp ? "SignIn" : "SignUp"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token != null,
    authRedirectPath: state.auth.authRedirectPath,
    burgerBuilding: state.burgerBuilder.building,
    canSignin: state.auth.canSignin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthSignin: (email, password) =>
      dispatch(actions.authSignin(email, password)),
    onAuthSignup: (name, email, password) =>
      dispatch(actions.authSignup(name, email, password)),
    onAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
    // onSetAuthSignin: () => dispatch(actions.setAuthSignin(true)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
