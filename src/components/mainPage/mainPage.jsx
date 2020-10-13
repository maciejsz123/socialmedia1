import React from 'react';
import { Link } from "react-router-dom";
import './mainPage.sass';
import { connect } from 'react-redux';
import { setActualUser } from '../../actions/usersActions'
import Search from '../search/search';

function MainPage(props) {

  function logout() {
    props.setActualUser({});
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-4 d-flex justify-content-start'>
          <Search />
        </div>
        <div className='col-4 d-flex justify-content-center'>
          <ul>
            <li>
              <Link to="/" className='a-color'>home</Link>
            </li>
            <li>
              <Link to="/posts" className='a-color'>posts</Link>
            </li>
            <li>
              <Link to="/chat" className='a-color'>chat</Link>
            </li>
          </ul>
        </div>
        <div className='col-4 d-flex justify-content-end'>
          <img src={require('../../imgs/logout.png')} alt='logout' onClick={logout} className='logout' />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  actualUser: state.users.actualUser
})

export default connect(mapStateToProps, { setActualUser })(MainPage);
