import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initailState = {
  orders: [],
  error: null,
  loading: false,
};

const burgerPurchaseInit = (state, action) => {
  return updateObject(state, { loading: true });
};

const burgerPurchaseSuccess = (state, action) => {
  return updateObject(state, { loading: false });
};

const burgerPurchaseFailed = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const fetchOrderStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchOrderSuccess = (state, action) => {
  return updateObject(state, { orders: action.orders, loading: false });
};

const fetchOrderFailed = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const reducer = (state = initailState, action) => {
  switch (action.type) {
    case actionTypes.BURGER_PURCHASE_INIT:
      return burgerPurchaseInit(state, action);
    case actionTypes.BURGER_PURCHASE_SUCCESS:
      return burgerPurchaseSuccess(state, action);
    case actionTypes.BURGER_PURCHASE_FAILED:
      return burgerPurchaseFailed(state, action);
    case actionTypes.FETCH_ORDER_START:
      return fetchOrderStart(state, action);
    case actionTypes.FETCH_ORDER_SUCCESS:
      return fetchOrderSuccess(state, action);
    case actionTypes.FETCH_ORDER_FAILED:
      return fetchOrderFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
