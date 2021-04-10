import React, { Component } from 'react';
import Home from '../screens/home/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Details from './details/Details';
import Checkout from './checkout/Checkout';

class Controller extends Component {

    constructor() {
      super();
      this.baseUrl= "http://localhost:8080/api/";
    }
  
    render() {
      return (
        <Router>
          <div className="main-container">
            <Route exact path='/' render={(props) => <Home {...props} />} />
            <Route path='/restaurant/:restaurantId' render={(props) => <Details {...props} />} />
            <Route exact path="/checkout" render={props=> <Checkout {...props} baseUrl={this.baseUrl}/>} />
          </div>
        </Router>
      )
    }
  }
  
  export default Controller;