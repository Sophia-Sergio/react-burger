import React from "react";
import classes from "./Order.css";

const order = props => {
  const ingredients = [];

  for (let ingredientKey in props.ingredients) {
    ingredients.push({
      name: ingredientKey,
      amount: props.ingredients[ingredientKey]
    });
  }

  const ingredients_display = ingredients.map(ingredient => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "2px solid grey",
          padding: "5px"
        }}
      >
        {ingredient.name} | {ingredient.amount}
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      Ingredients: {ingredients_display}
      <p>
        Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
