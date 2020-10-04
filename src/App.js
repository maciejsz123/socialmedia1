import React from 'react';
import Login from './components/login/login';
import MainPage from './components/mainPage/mainPage';
import Posts from './components/posts/posts';
import Chat from './components/chat/chat';
import User from './components/users/user';
import { connect } from 'react-redux';
import './App.sass';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App(props) {
  if(!Object.keys(props.actualUser).length) {
    return <Login />
  }
  return (
    <Router>
      <div className='App'>
        <MainPage />
      </div>
        <Switch>
          <Route exact path='/'>
          </Route>
          <Route path='/posts'>
            <Posts />
          </Route>
          <Route path='/chat'>
            <Chat />
          </Route>
          <Route path='/user/:id'>
            <User />
          </Route>
        </Switch>
    </Router>
  );
}

const mapStateToProps = state => ({
  actualUser: state.users.actualUser
})

export default connect(mapStateToProps)(App);
