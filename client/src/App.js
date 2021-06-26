import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import 'antd/dist/antd.css';

import { HomePage, SearchPage, DetailsPage } from './pages';

import { Layout } from 'antd';
import { Header } from './components';

function App() {
  const [userData, setUserData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <Router>
      <Layout>
        <Header
          userData={userData}
          loggedIn={loggedIn}
          setUserData={setUserData}
          setLoggedIn={setLoggedIn}
        />
      </Layout>
      <Switch>
        <Route path="/search">
          <SearchPage />
        </Route>
        <Route path="/details/:courseId">
          <DetailsPage userData={userData} loggedIn={loggedIn} />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
