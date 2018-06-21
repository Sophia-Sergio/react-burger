import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
]

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    {controls.map( (ctrl) => (
        <BuildControl
          key={ctrl.type}
          label={ctrl.label}
          type={ctrl.type}
          added={() => props.ingredientAdded(ctrl.type)}
          removed={() => props.ingredientRemoved(ctrl.type)}
          disabled={props.disabledIngredients[ctrl.type]}
        />
    ))}
    {props.purchasable? <button className={classes.OrderButton} onClick={props.purchaseHandler}>ORDER NOW</button> : null }
    <p>{props.total.toFixed(2)}</p>
  </div>
);

export default buildControls