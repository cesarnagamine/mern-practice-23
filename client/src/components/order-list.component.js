import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Orders = props => (
  <tr>
    <td>{props.orders.username}</td>
    <td>{props.orders.description}</td>
    <td>{props.orders.duration}</td>
    <td>{props.orders.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/" + props.orders._id}>edit</Link> | <a href="#" onClick={() => { props.deleteOrders(props.orders._id) }}>delete</a>
    </td>
  </tr>
)

export default class OrdersList extends Component {
  constructor(props) {
    super(props);

    this.deleteOrders = this.deleteOrders.bind(this)

    this.state = {orders: []};
  }

  componentDidMount() {
    // axios.get('http://localhost:3001/orders/')
    axios.get('https://mern-practice-23.herokuapp.com/orders/')
      .then(response => {
        this.setState({ orders: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteOrders(id) {
    // axios.delete('http://localhost:3001/orders/' + id)
    axios.delete('https://mern-practice-23.herokuapp.com/orders/' + id)
      .then(response => { console.log(response.data)});

    this.setState({
      orders: this.state.orders.filter(el => el._id !== id)
    })
  }

  OrdersList() {
    return this.state.orders.map(currentOrders => {
      return <Orders orders={currentOrders} deleteOrders={this.deleteOrders} key={currentOrders._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Orders</h3>
        <p>Refresh if order list has not been mapped.</p>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Client</th>
              <th>Order</th>
              <th>Delivery Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.OrdersList() }
          </tbody>
        </table>
      </div>
    )
  }
}