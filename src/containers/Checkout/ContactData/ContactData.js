import React from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-order";
import Input from "../../../components/UI/Input/Input";
import {
  burgerPurchase,
  canSetIngredients,
} from "../../../store/actions/index";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/WithErrorHandler/withErrorHandler";

class ContactData extends React.Component {
  state = {
    orderForm: {
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
          minLength: 5,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        config: {
          type: "text",
          name: "street",
          placeholder: "Your Street",
        },
        value: "",
        validationRules: {
          required: true,
          minLength: 2,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        config: {
          type: "text",
          name: "zipCode",
          placeholder: "Zip Code",
        },
        value: "",
        validationRules: {
          required: true,
          minLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        config: {
          type: "text",
          name: "country",
          placeholder: "Country",
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
          placeholder: "Your E-mail",
        },
        value: "",
        validationRules: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        config: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        valid: true,
      },
    },
    validForm: false,
  };

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

  componentDidMount() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: "smooth" });
  }

  inputChangeHandler = (event, identifier) => {
    const updatedOrder = { ...this.state.orderForm };
    const updatedType = { ...updatedOrder[identifier] };
    updatedType.value = event.target.value;
    updatedType.valid = this.checkValidity(
      updatedType.value,
      updatedType.validationRules
    );
    updatedType.touched = true;
    updatedOrder[identifier] = updatedType;
    let valid = true;
    for (let type in updatedOrder) {
      if (updatedOrder[type].valid === false) {
        valid = false;
      }
    }
    // console.log(valid);
    this.setState({ orderForm: updatedOrder, validForm: valid });
  };

  orderHandler = (event) => {
    event.preventDefault();
    // console.log(this.props.ing)
    this.setState({
      loading: true,
    });
    let customerData = {};
    for (let type in this.state.orderForm) {
      customerData[type] = this.state.orderForm[type].value;
    }
    const order = {
      ingredients: this.props.ing,
      // orderData: customerData,
      userId: this.props.userId,
    };
    this.props.onBurgerPurchase(order, this.props.history, this.props.token);
    // this.props.history.push("/");
  };

  render() {
    const ref = this.state.orderForm;
    const formElementArray = Object.keys(ref).map((type) => {
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
    });

    let form = (
      <form
        ref={(el) => {
          this.el = el;
        }}
        onSubmit={this.orderHandler}
      >
        {formElementArray}
        <Button disabled={!this.state.validForm} btnType="Success">
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter the contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ing: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.orders.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBurgerPurchase: (order, historyProps, token) => {
      dispatch(canSetIngredients());
      dispatch(burgerPurchase(order, historyProps, token));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
