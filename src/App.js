import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// Layout wrapper
import Layout from './pages/Layout';

// Pages
import CalcPage from './pages/Calc';

import './css/style.css';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path='/' component={CalcPage}/>
        </Switch>
      </Layout>
    );
  }
}

export default App;
