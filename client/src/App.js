import React, { Component} from 'react';
import  NavBar  from "./_components/NavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./_components/Register";
import Login from "./_components/Login";
import Home from "./_components/Home";
import PrivateRoute from "./_components/PrivateRoute/PrivateRoute.js";
import store from './store/store';
import { Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./_actions/usersActions";
import jwt_decode from "jwt-decode";
import RestaurantDetails from "./_components/RestaurantDetails";
import 'mapbox-gl/dist/mapbox-gl.css';
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component{
  render(){
    return (
      <Provider store={store}> 
      <Router>
      <div className="App">
       
        <Route exact path="/" component={NavBar} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Switch>
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute  path="/restaurants/:id" component={RestaurantDetails} />
        </Switch>
        
        </div>
    </Router>
    </Provider>
    )
  }
}

export default App;
