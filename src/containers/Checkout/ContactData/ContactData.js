import React from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from "../../../axios-orders";

class ContactData extends React.Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'Sergio Torres Santander',
        adress: {
          street: 'Agustinas 1888, dpto 1304',
          zipcode: '413511',
          country: 'Chile'
        },
        email: 'san.storres@gmail.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false });
      }); // this is it just for firebase, in other services u need a custom config
  }

  render () {
    let form = (<form action="#">
                  <input type="text" name="name" placeholder="Your Name"/>
                  <input type="email" name="email" placeholder="Your Email"/>
                  <input type="text" name="street" placeholder="Street"/>
                  <input type="text" name="postal" placeholder="Postal Code"/>
                  <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>);
    if (this.state.loading) {
      form = <Spinner/>;
    }
    return (

      <div className={classes.ContactData}>
      <h4>Enter Your COntact Data</h4>
        {form}
      </div>
    )
  }

}

export default ContactData;