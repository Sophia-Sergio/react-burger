import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends React.Component {

  componentWillUpdate(){
  };

  render(){
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey =>(
        <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}: {this.props.ingredients[igKey]}</span></li>
    ));

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicius burger with the following ingrediets</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p>Continue to Checkout</p>
        <p><strong>Total: { this.props.totalPrice.toFixed(2) }</strong></p>

        <Button btnType='Danger' clicked={this.props.cancelOrder}>CANCEL</Button>
        <Button btnType='Success' clicked={this.props.continueOrder}>CONTINUE</Button>
      </Aux>
    )
  };
}

export default OrderSummary;