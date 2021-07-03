import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import 'antd/dist/antd.css';

import {
  HomePage,
  SearchPage,
  DetailsPage,
  FavoritePage,
  Dashboard,
} from './pages';

import { Header, Footer } from './components';

function App() {
  const [userData, setUserData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <Router>
      <Header
        userData={userData}
        loggedIn={loggedIn}
        setUserData={setUserData}
        setLoggedIn={setLoggedIn}
      />
      <Switch>
        <Route path="/search">
          <SearchPage />
        </Route>
        <Route path="/details/:courseId">
          <DetailsPage userData={userData} loggedIn={loggedIn} />
        </Route>
        <Route path="/favorite">
          <FavoritePage userData={userData} loggedIn={loggedIn} />
        </Route>
        <Route path="/dashboard">
          <Dashboard userData={userData} loggedIn={loggedIn} />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
