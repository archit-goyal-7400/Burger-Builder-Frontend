import React from "react";
import classes from "./Order.css";

const Order = (props) => {
  const display = Object.keys(props.ingredients).map((ingredient) => {
    return (
      <span key={ingredient} className={classes.StyleIng}>
        {ingredient} ({props.ingredients[ingredient]})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients : {display}</p>
      <p>
        Price : <strong>Rs. {props.price}</strong>
      </p>
    </div>
  );
};

export default Order;
