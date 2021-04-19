import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';

import HomePage from './pages/home';
import SearchPage from './pages/search';
import DetailsPage from './pages/details';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/search">search</Link>
            </li>
            <li>
              <Link to="/details">details</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/details">
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
