import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };
  componentDidMount() {
    axios.get("/orders.json").then(res => {
      const orders = [];
      for (let key in res.data){
        orders.push({
          ...res.data[key],
          id: key
        })
      }
      this.setState({
        loading: false,
        orders
      });
    }).catch(err => {
        this.setState({ loading: false });
    });
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order key={order.id} ingredients={order.ingredients} price={order.price} />
        ))}
      </div>
    );
  }
}

export default WithErrorHandler(Orders, axios);
