import React, { useEffect } from 'react';
import { Route, Switch} from 'react-router-dom';
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import {useDispatch, useSelector} from 'react-redux';
import { isUserLoggedIn, getAllCategory, getInitialData } from './actions';
import Category from './containers/Category';
import Products from './containers/Products';
import NewPage from './containers/NewPage';
import Orders from './containers/Orders';
function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  // thêm input để khi auth.authenticate thay đổi thì useEffect() chạy
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if (auth.authenticate) {
      dispatch(getInitialData());
    }
  }, [auth.authenticate])
  return (
    <div className="App">
        <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/page" component={NewPage} />
        <PrivateRoute path="/category" component={Category} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/orders" component={Orders} />
          <Route path="/signin" component={Signin}></Route>
          <Route path="/signup" component={Signup}></Route>
        </Switch>
    </div>
  );
}

export default App;
