import React, { Component } from "react";
import Order from "../../../components/Order/Order";
import axios from "../../../axios-order";
import withErrorHandler from "../../../hoc/WithErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../../components/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }
  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      if (this.props.orders.length !== 0) {
        orders = (
          <div>
            {this.props.orders.map((order) => {
              return (
                <Order
                  ingredients={order.ingredients}
                  price={order.price}
                  key={order._id}
                />
              );
            })}
          </div>
        );
      } else {
        orders = (
          <div style={{ textAlign: "center", fontWeight: "bold" }}>
            It seems like you haven't order anything yet
          </div>
        );
      }
    }
    return orders;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
