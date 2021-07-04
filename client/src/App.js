  
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import OrdersList from "./components/order-list.component";
import EditOrder from "./components/edit-order.component";
import CreateOrder from "./components/create-order.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={OrdersList} />
      <Route path="/edit/:id" component={EditOrder} />
      <Route path="/create" component={CreateOrder} />
      <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
