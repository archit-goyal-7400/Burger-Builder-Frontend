import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const INGREDIENTS_PRICES = {
  meat: 8,
  salad: 6,
  cheese: 5,
  bacon: 10,
};

const initialState = {
  ingredients: null,
  totalPrice: 10,
  error: false,
  canSetIngredients: true,
  building: false,
};

const addIngredient = (state, action) => {
  const updatedState = {
    ingredients: {
      ...state.ingredients,
      [action.ingName]: state.ingredients[action.ingName] + 1,
    },
    totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingName],
    building: true,
  };
  const x = updateObject(state, updatedState);
  return x;
};

const removeIngredient = (state, action) => {
  const updatedState = {
    ingredients: {
      ...state.ingredients,
      [action.ingName]: state.ingredients[action.ingName] - 1,
    },
    totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingName],
    building: true,
  };
  return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    error: false,
    totalPrice: 10,
    canSetIngredients: false,
    building: true,
  });
};

const canSetIngredients = (state, action) => {
  return updateObject(state, {
    canSetIngredients: true,
  });
};

const fetchedIngredientsFailed = (state, action) => {
  return updateObject(state, { error: true });
};

const setBuildingBurger = (state, action) => {
  return updateObject(state, { building: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchedIngredientsFailed(state, action);
    case actionTypes.CAN_SET_INGREDIENTS:
      return canSetIngredients(state, action);
    case actionTypes.SET_BUILDING_BURGER:
      return setBuildingBurger(state, action);
    default:
      return state;
  }
};

export default reducer;
