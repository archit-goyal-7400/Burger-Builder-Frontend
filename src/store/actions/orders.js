import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

const burgerPurchaseSuccess = () => {
  return {
    type: actionTypes.BURGER_PURCHASE_SUCCESS,
  };
};

const burgerPurchaseFailed = (err) => {
  return {
    type: actionTypes.BURGER_PURCHASE_SUCCESS,
    error: err,
  };
};

const burgerPurchaseInit = () => {
  return {
    type: actionTypes.BURGER_PURCHASE_INIT,
  };
};

export const burgerPurchase = (order, historyProps, token) => {
  return (dispatch) => {
    dispatch(burgerPurchaseInit());
    axios
      .post("http://localhost:8080/order", order)
      .then((res) => {
        console.log(res);
        dispatch(burgerPurchaseSuccess());
      })
      .catch((err) => {
        dispatch(burgerPurchaseFailed());
      })
      .then(() => {
        historyProps.push("/");
      });
  };
};

const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START,
  };
};

const fetchOrderSucces = (orders) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders,
  };
};

const fetchOrderFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDER_FAILED,
    error,
  };
};

export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrderStart());
    const queryParams = "?userId=" + userId;
    // const fetchedItems = [];
    axios
      .get("http://localhost:8080/order" + queryParams)
      .then((res) => {
        dispatch(fetchOrderSucces(res.data.orders));
      })
      .catch((err) => {
        dispatch(fetchOrderFailed(err));
      });
  };
};
