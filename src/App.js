import React, { Component } from 'react';

// Layout wrapper
import Layout from './pages/Layout';

// Pages
import CalcPage from './pages/Calc';

import './css/style.css';

class App extends Component {
  render() {
    return (
      <Layout>
        <CalcPage/>
      </Layout>
    );
  }
}

export default App;
