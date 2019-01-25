import React, { Component } from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import PageHome from './page/PageHome';
class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
            <Route exact path={'/'} component={PageHome}/>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
