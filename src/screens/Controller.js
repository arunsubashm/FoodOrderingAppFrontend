import React, { Component } from 'react';
import Home from '../screens/home/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Details from './details/Details';

class Controller extends Component {

    constructor() {
      super();
    }
  
    render() {
      return (
        <Router>
          <div className="main-container">
            <Route exact path='/' render={(props) => <Home {...props} />} />
            <Route path='/api/restaurant/' render={(props) => <Details {...props} />} />
          </div>
        </Router>
      )
    }
  }
  
  export default Controller;