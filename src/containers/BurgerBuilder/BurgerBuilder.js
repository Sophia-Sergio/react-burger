import React from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.2,
  meat: 0.7
};

class BurgerBuilder extends React.Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount () {
    axios.get('https://react-my-burger-210d3.firebaseio.com/ingredients.json')
    .then(response => {
      this.setState({
        ingredients: response.data
      })
    })
    .catch(error => {
      this.setState({
        error: true
      })
    })
  }

  modalClosed = () => {
    this.setState({
      purchasing: false
    });
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  };

  purchaseContinueHandler = () => {
    // console.log(this.state.ingredients)
    const queryParams = Object.keys(this.state.ingredients).map((key, index) => {
      return encodeURIComponent(key) + '=' + this.state.ingredients[key];
    })
    queryParams.push('totalPrice=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    // const queryString = queryParams.join('&')

    this.props.history.push({
      pathname : '/checkout',
      search: queryString
    })
  };

  updatePurchaseState(ingredients) {
    const sum = Object.values(ingredients)
      .map(val => {
        return val;
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 })
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.totalPrice + INGREDIENTS_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchaseState(updatedIngredients);
  };
  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    // the same will be
    /*if (oldCount <= 0){
      return;
    }*/
    // *********************
    if (oldCount !== 0) {
      const updatedCount = oldCount - 1;
      const updatedIngredients = {
        ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;
      const newPrice = this.state.totalPrice - INGREDIENTS_PRICES[type];

      this.setState({
        ingredients: updatedIngredients,
        totalPrice: newPrice
      });
      this.updatePurchaseState(updatedIngredients);
    }
  };

  render() {
    const disabledIngredients = { ...this.state.ingredients };
    for (let key in disabledIngredients) {
      disabledIngredients[key] = disabledIngredients[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error? "ingredients can't be displayed" : <Spinner/>;
    if (this.state.ingredients){
      burger = (
        <Aux>
          <div style={{width: "500px", margin: "0 auto"}}>
            <Burger ingredients={this.state.ingredients} />
          </div>
          <BurgerControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            total={this.state.totalPrice}
            disabledIngredients={disabledIngredients}
            purchasable={this.state.purchasable}
            purchaseHandler={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummary =  <OrderSummary
                        continueOrder={this.purchaseContinueHandler}
                        cancelOrder={this.modalClosed}
                        ingredients={this.state.ingredients}
                        totalPrice={this.state.totalPrice}
                      />;
    }
    if (this.state.loading){
      orderSummary = <Spinner/>;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.modalClosed}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
