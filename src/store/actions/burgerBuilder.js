import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

export const addIngredient = (ingName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingName,
  };
};

export const removeIngredient = (ingName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingName,
  };
};

export const canSetIngredients = () => {
  return {
    type: actionTypes.CAN_SET_INGREDIENTS,
  };
};

export const setBuildingBurger = () => {
  return {
    type: actionTypes.SET_BUILDING_BURGER,
  };
};

const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients,
  };
};

const fetchedIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const burgerBuilderInit = (state, action) => {
  return (dispatch) => {
    axios
      .get("http://localhost:8080/set_ingredients")
      .then((res) => {
        console.log(res);
        dispatch(setIngredients(res.data));
      })
      .catch((err) => {
        // console.log(err);
        dispatch(fetchedIngredientsFailed());
      });
  };
};
