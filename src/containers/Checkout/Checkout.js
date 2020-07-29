import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import Aux from "../../hoc/Auxillary";
import { connect } from "react-redux";

class Checkout extends React.Component {
  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };

  continueCheckoutHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ing) {
      summary = (
        <Aux>
          <CheckoutSummary
            ingredients={this.props.ing}
            cancelCheckout={this.cancelCheckoutHandler}
            continueCheckout={this.continueCheckoutHandler}
          />
          <Route path={"/checkout/contact-data"} component={ContactData} />
        </Aux>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ing: state.burgerBuilder.ingredients,
  };
};

export default connect(mapStateToProps)(Checkout);
