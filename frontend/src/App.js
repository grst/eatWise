import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import UserProfile from './components/UserProfile'
import ShoppingList from './components/ShoppingList'
import PurchaseSummary from './components/PurchaseSummary'
import Friends from './components/Friends'
import ChallengeResult from './components/ChallengeResult'
import Login from './components/Login'
import CssBaseline from '@material-ui/core/CssBaseline';

import HeaderBar from "./components/HeaderBar";
import NavigationBar from "./components/NavigationBar";

import Paper from '@material-ui/core/Paper';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CssBaseline />
        <BrowserRouter>
          <Fragment>
            <HeaderBar />
            <Paper>
             <Switch>
               <Route path='/profile' component={UserProfile} />
               <Route exact path='/' component={ShoppingList} />
               <Route path='/shopping-list' component={ShoppingList} />
               <Route path='/purchase-summary' component={PurchaseSummary} />
               <Route path='/challenge-a-friend' component={Friends} />
               <Route path='/challenge-result' component={ChallengeResult} />
               <Route path='/login' component={Login} />
             </Switch>
            </Paper>
            {/*<NavigationBar/>*/}
            </Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
