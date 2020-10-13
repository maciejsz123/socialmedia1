import React from 'react';
import Login from './components/login/login';
import MainPage from './components/mainPage/mainPage';
import Posts from './components/posts/posts';
import Chat from './components/chat/chat';
import User from './components/users/user';
import Gallery from './components/users/gallery/gallery';
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
          <Route exact path='/' />
          <Route path='/posts' component={Posts} />
          <Route path='/chat' component={Chat} />
          <Route exact path='/user/:id' component={User} />
          <Route path='/user/:id/gallery' component={Gallery} />
        </Switch>
    </Router>
  );
}

const mapStateToProps = state => ({
  actualUser: state.users.actualUser
})

export default connect(mapStateToProps)(App);
