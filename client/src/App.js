import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import 'antd/dist/antd.css';

import { HomePage, SearchPage, DetailsPage } from './pages';

import { Layout } from 'antd';

import { Header } from './components';

function App() {
  return (
    <Router>
      <Layout>
        <Header />
      </Layout>
      <div>
        <Switch>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/details/:id">
            <DetailsPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
