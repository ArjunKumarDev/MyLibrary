import React,{Fragment,useEffect} from "react";
import {Link,BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Header from './components/layout/Header';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Cart from './components/cart/Cart';
import MyLibrary from './components/library/MyLibrary';
import Create from './components/addbooks/create';
import Book from './components/book/Book';
import Account from './components/account/Account';
import {loaduser} from './actions/auth';
import setAuthToken from './utils/setAuthtoken';
import {Container} from "semantic-ui-react";

// redux
import {Provider} from "react-redux";
import store from "./store/store";


if(localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {


  useEffect(() => {
    store.dispatch(loaduser())
 })

  return(
    <Provider store={store}>
           <Router>
    <Fragment>
      <Header />
      <div style={{"marginTop":"20px"}}>
      <Container>
      <Switch>
        <Route  exact path="/" component={MyLibrary} />
        <Route  path="/signup" component={Signup} />
        <Route  path="/login" component={Login} />
        <Route  path="/create" component={Create} />
        <Route  path="/cart" component={Cart} />
        <Route  path="/book/:id" component={Book} />
        <Route path="/account" component={Account} />

      </Switch>
   
      </Container>
      </div>

      </Fragment>
      </Router>
      </Provider>

  )
}

export default App;