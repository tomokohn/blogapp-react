import React from 'react';
import {Router,Route,hashHistory} from 'react-router';
import Home from './Home';
import Posts from './posts';
import Admin from './admin';


class Root extends React.Component {
  render() {
    return (
      <div>
      <Router history={hashHistory}>
      <Route path="/" component={Home}>
        <Route path="posts" component={Posts}></Route>
        <Route path="admin" component={Admin}></Route>
      </Route>
      </Router>
      </div>
  )

  }
}

export default Root;
