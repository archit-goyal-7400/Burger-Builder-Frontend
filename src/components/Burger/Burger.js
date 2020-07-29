import React from "react";
import classes from "./Burger.css";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";

const Burger = (props) => {
  //Using map function(Always use map function to map the array instead of creating empty array than pushing elements in it.)
  let transformedIngredients = Object.keys(props.ingredients)
    .map((igkey) => {
      return [...Array(props.ingredients[igkey])].map((_, index) => {
        return <BurgerIngredients key={igkey + index} type={igkey} />;
      });
    })
    .reduce((prev, curr) => {
      return prev.concat(curr);
    }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients !!</p>;
  }
  //Avoid this approach but this is also correct.
  // const transformedIngredients = [];
  // Object.keys(props.ingredients).forEach(ing => {
  //     for (var x = 0; x < props.ingredients[ing]; x++) {
  //         transformedIngredients.push(<BurgerIngredients key={ing + x} type={ing} />)
  //     }
  // });

  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top" />
      {transformedIngredients}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
};

export default Burger;
