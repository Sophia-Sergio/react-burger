import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom'

class Checkout extends React.Component {

  state = {
    ingredients: null,
    price: 0
  };
  componentWillMount () {
    const query = new URLSearchParams(this.props.location.search);
    let ingredients = {};
    let price = 0;
    for (let param of query.entries()){
      if (param[0] !== 'totalPrice') {
        ingredients[param[0]] = +param[1];
      }else{
        price = param[1];
      }
    }
    this.setState({
      ingredients: ingredients,
      price: price
    })
  }

  checkoutCancelledHandlder = () => {
    this.props.history.goBack();
  }
  checkoutContinuedHandlder = () => {
    this.props.history.replace('/checkout/contact-data')
  }
  render(){

    return (
      <div>
        <CheckoutSummary
        checkoutCancelled={this.checkoutCancelledHandlder}
        checkoutContinued={this.checkoutContinuedHandlder}
        ingredients={this.state.ingredients}/>
        <Route path={this.props.match.path + '/contact-data'} render={ () => (<ContactData ingredients={this.state.ingredients} totalPrice={this.state.price}/>)}/>
      </div>
    )
  }
}

export default Checkout;