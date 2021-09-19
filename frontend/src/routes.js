import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';
import Details from './pages/Details';
import Create from './pages/Create';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/cadastro' component={Cadastro} />
        <ProtectedRoute exact path='/home' component={Home} />
        <ProtectedRoute exact path='/create' component={Create} />
        <ProtectedRoute exact path='/details/:id' component={Details} />
        <ProtectedRoute path='*' component={() => '404 NOT FOUND'} />
      </Switch>
    </BrowserRouter>
  );
}
