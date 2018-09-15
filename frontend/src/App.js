import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import UserProfile from './components/UserProfile'
import ShoppingList from './components/ShoppingList'
import PurchaseSummary from './components/PurchaseSummary'
import Friends from './components/Friends'
import ChallengeResult from './components/ChallengeResult'
import Login from './components/Login'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={UserProfile} />
            <Route path='/shopping-list' component={ShoppingList} />
            <Route path='/purchase-summary' component={PurchaseSummary} />
            <Route path='/challenge-a-friend' component={Friends} />
            <Route path='/challenge-result' component={ChallengeResult} />
            <Route path='/login' component={Login} />
          </Switch>
         </BrowserRouter>
      </div>
    );
  }
}

export default App;
